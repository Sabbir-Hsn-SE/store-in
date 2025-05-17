import { useEffect, useState } from "react";

/**
 * Custom hook to debounce a value over a specified delay.
 *
 * @param value The value to debounce
 * @param delay Delay in milliseconds (e.g. 500 for half a second)
 * @returns Debounced value
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cancel timeout if value or delay changes (cleanup)
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
