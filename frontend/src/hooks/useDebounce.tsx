import { useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDebounce = (debouncedValue: any, delay: number) => {
  const [value, setValue] = useState(debouncedValue);
  useEffect(() => {
    const handler = setTimeout(() => {
      setValue(debouncedValue);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [debouncedValue, delay]);

  return value;
};
