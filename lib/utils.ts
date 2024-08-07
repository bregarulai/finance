import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertAmountToMiliunits = (amount: number) => {
  return Math.round(amount * 100);
};

export const convertAmountFromMiliunits = (amount: number) => {
  return amount / 100;
};
