import { useEffect } from "react";

// Custom hook to suppress specific console error warnings related to `defaultProps`
export const useRemoveXAxisWarning = () => {
  useEffect(() => {
    // Store the original console.error function to restore it later
    const originalConsoleError = console.error;

    // Override console.error to filter out specific warnings
    console.error = (...args: any[]) => {
      // Check if the error message is a string and contains the keyword "defaultProps"
      if (typeof args[0] === "string" && /defaultProps/.test(args[0])) {
        // If it matches, don't log the warning and return early
        return;
      }

      // Otherwise, call the original console.error function with the arguments
      originalConsoleError(...args);
    };

    // Clean up function to restore the original console.error when the component unmounts
    return () => {
      console.error = originalConsoleError;
    };
  }, []);
};
