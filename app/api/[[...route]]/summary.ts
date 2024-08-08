import { db } from "@/db/drizzle";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { differenceInDays, parse, subDays } from "date-fns";
import { and, desc, eq, gte, lt, lte, sql, sum } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

import { accounts, categories, transactions } from "@/db/schema";
import { calculatePercentageChange, fillMissingDays } from "@/lib/utils";
import { outputFormat } from "@/constants";

const app = new Hono().get(
  "/",
  clerkMiddleware(),
  zValidator(
    "query",
    z.object({
      from: z.string().optional(),
      to: z.string().optional(),
      accountId: z.string().optional(),
    })
  ),
  async (c) => {
    const auth = getAuth(c);
    const { from, to, accountId } = c.req.valid("query");

    if (!auth?.userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const defaultTo = new Date();
    const defaultFrom = subDays(defaultTo, 30);

    const startDate = from
      ? parse(from, outputFormat, new Date())
      : defaultFrom;

    const endDate = to ? parse(to, outputFormat, new Date()) : defaultTo;

    const periodLength = differenceInDays(endDate, startDate) + 1;
    const lastPeriodStart = subDays(startDate, periodLength);
    const lastPeriodEnd = subDays(endDate, periodLength);

    const [currentPeriod] = await fetchFinancialData(
      auth.userId,
      accountId,
      startDate,
      endDate
    );
    const [lastPeriod] = await fetchFinancialData(
      auth.userId,
      accountId,
      lastPeriodStart,
      lastPeriodEnd
    );

    const incomeChange = calculatePercentageChange(
      currentPeriod.income,
      lastPeriod.income
    );

    const expensesChange = calculatePercentageChange(
      currentPeriod.expenses,
      lastPeriod.expenses
    );

    const remainingChange = calculatePercentageChange(
      currentPeriod.remaining,
      lastPeriod.remaining
    );

    // Query the database to fetch the category-wise sum of absolute transaction amounts
    const category = await db
      .select({
        // Select the name of the categories
        name: categories.name,
        // Calculate the sum of absolute values of transaction amounts for each category
        value: sql`SUM(ABS(${transactions.amount}))`.mapWith(Number),
      })
      .from(transactions) // From the transactions table
      .innerJoin(accounts, eq(transactions.accountId, accounts.id)) // Join with the accounts table based on accountId
      .innerJoin(categories, eq(transactions.categoryId, categories.id)) // Join with the categories table based on categoryId
      .where(
        and(
          // If accountId is provided, add a condition to match the accountId
          accountId ? eq(transactions.accountId, accountId) : undefined,
          // Add a condition to match the userId
          eq(accounts.userId, auth.userId),
          // Add a condition to include only negative amounts (expenses)
          lt(transactions.amount, 0),
          // Add conditions to filter transactions within the startDate and endDate
          gte(transactions.date, startDate),
          lte(transactions.date, endDate)
        )
      )
      .groupBy(categories.name) // Group the results by category name
      .orderBy(desc(sql`SUM(ABS(${transactions.amount}))`)); // Order the results by the sum of absolute transaction amounts in descending order

    // Get the top 3 categories with the highest expenses
    const topCategories = category.slice(0, 3);

    // Get the remaining categories beyond the top 3
    const otherCategories = category.slice(3);

    // Calculate the sum of values for the remaining categories
    const otherSum = otherCategories.reduce(
      (sum, current) => sum + current.value,
      0
    );

    const finalCategories = topCategories;

    if (otherCategories.length > 0) {
      finalCategories.push({
        name: "Other",
        value: otherSum,
      });
    }

    const activeDays = await db
      .select({
        // Select the date of the transactions
        date: transactions.date,
        // Calculate the total income for each day
        income:
          sql`SUM(CASE WHEN ${transactions.amount} >= 0 THEN ${transactions.amount} ELSE 0 END)`.mapWith(
            Number
          ),
        // Calculate the total expenses for each day
        expenses:
          sql`SUM(CASE WHEN ${transactions.amount} < 0 THEN ${transactions.amount} ELSE 0 END)`.mapWith(
            Number
          ),
      })
      .from(transactions) // From the transactions table
      .innerJoin(accounts, eq(transactions.accountId, accounts.id)) // Join with the accounts table based on accountId
      .where(
        and(
          // If accountId is provided, add a condition to match the accountId
          accountId ? eq(transactions.accountId, accountId) : undefined,
          // Add a condition to match the userId
          eq(accounts.userId, auth.userId),
          // Add conditions to filter transactions within the startDate and endDate
          gte(transactions.date, startDate),
          lte(transactions.date, endDate)
        )
      )
      .groupBy(transactions.date) // Group the results by date
      .orderBy(desc(transactions.date)); // Order the results by date in descending order

    const days = fillMissingDays(activeDays, startDate, endDate);

    return c.json({
      data: {
        remainingAmount: currentPeriod.remaining,
        remainingChange,
        incomeAmount: currentPeriod.income,
        incomeChange,
        expensesAmount: currentPeriod.expenses,
        expensesChange,
        categories: finalCategories,
        days,
      },
    });
  }
);

// Function to fetch financial data for a user within a specified date range
const fetchFinancialData = async (
  userId: string, // The ID of the user
  accountId: string | undefined, // The ID of the account (optional)
  startDate: Date, // The start date of the date range
  endDate: Date // The end date of the date range
) => {
  // Perform a database query to fetch the financial data
  return await db
    .select({
      // Calculate total income (sum of non-negative transactions)
      income:
        sql`SUM(CASE WHEN ${transactions.amount} >= 0 THEN ${transactions.amount} ELSE 0 END)`.mapWith(
          Number
        ),
      // Calculate total expenses (sum of negative transactions)
      expenses:
        sql`SUM(CASE WHEN ${transactions.amount} < 0 THEN ${transactions.amount} ELSE 0 END)`.mapWith(
          Number
        ),
      // Calculate remaining balance (sum of all transactions)
      remaining: sum(transactions.amount).mapWith(Number),
    })
    .from(transactions) // From the transactions table
    .innerJoin(accounts, eq(transactions.accountId, accounts.id)) // Join with the accounts table
    .where(
      and(
        // If accountId is provided, add a condition to match the accountId
        accountId ? eq(transactions.accountId, accountId) : undefined,
        // Add a condition to match the userId
        eq(accounts.userId, userId),
        // Add a condition to filter transactions within the startDate and endDate
        gte(transactions.date, startDate),
        lte(transactions.date, endDate)
      )
    );
};

export default app;
