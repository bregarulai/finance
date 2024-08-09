import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { eachDayOfInterval, isSameDay, subDays, format } from "date-fns";
import { Period } from "@/types";

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

// Function to format a date range based on a given period or default to the last 30 days
export const formatDateRange = (period?: Period) => {
  // Set the default end date to today
  const defaultTo = new Date();
  // Set the default start date to 30 days before today
  const defaultFrom = subDays(defaultTo, 30);

  // If the 'from' date in the period is not provided, use the default range
  if (!period?.from) {
    return `${format(defaultFrom, "LLL dd")} - ${format(
      defaultTo,
      "LLL dd, y"
    )}`;
  }

  // If the 'to' date in the period is not provided, format the range using the 'from' date to today
  if (!!period.to) {
    return `${format(period.from, "LLL dd")} - ${format(
      defaultTo,
      "LLL dd, y"
    )}`;
  }

  // If both 'from' and 'to' dates are provided, format only the 'from' date
  return format(period.from, "LLL dd, y");
};

// Function to format a number as a percentage, with an optional prefix for positive values
export const formatPercentage = (
  value: number,
  options: { addPrefix?: boolean } = { addPrefix: false } // Optional parameter to add a prefix
) => {
  // Format the value as a percentage using the Intl.NumberFormat API
  const result = Intl.NumberFormat("en-US", {
    style: "percent", // Specifies that the number should be formatted as a percentage
    maximumSignificantDigits: 2, // Limits the number of significant digits to 2
  }).format(value / 100); // Divides the value by 100 to get the correct percentage format

  // If addPrefix is true and the value is positive, add a "+" prefix
  if (options.addPrefix && value > 0) {
    return `+${result}`;
  }

  // Return the formatted percentage
  return result;
};
