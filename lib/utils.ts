import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { eachDayOfInterval, isSameDay } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertAmountToMiliunits = (amount: number) => {
  return Math.round(amount * 100);
};

export const convertAmountFromMiliunits = (amount: number) => {
  return amount / 100;
};

export const formatCurrency = (value: number) => {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
};

// Function to calculate the percentage change between two numbers
export const calculatePercentageChange = (
  current: number, // Current value
  previous: number // Previous value
) => {
  // Handle the special case where the previous value is 0
  if (previous === 0) {
    // If both previous and current are 0, return 0% change
    // If previous is 0 and current is not, return 100% change
    return previous === current ? 0 : 100;
  }

  // Calculate the percentage change
  return ((current - previous) / previous) * 100;
};

// Function to fill missing days in a list of active days with income and expenses data
export const fillMissingDays = (
  activeDays: {
    date: Date;
    income: number;
    expenses: number;
  }[],
  startDate: Date, // The start date of the interval
  endDate: Date // The end date of the interval
) => {
  // If there are no active days, return an empty array
  if (activeDays.length === 0) {
    return [];
  }

  // Get an array of all days in the specified interval
  const allDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  // Map over each day in the interval
  const transactionsByDay = allDays.map((day) => {
    // Find if the current day is in the list of active days
    const found = activeDays.find((activeDay) =>
      isSameDay(activeDay.date, day)
    );

    // If the day is found in active days, return it
    // Otherwise, create a new entry with zero income and expenses
    if (found) {
      return found;
    } else {
      return {
        date: day,
        income: 0,
        expenses: 0,
      };
    }
  });

  // Return the list of transactions with filled missing days
  return transactionsByDay;
};
