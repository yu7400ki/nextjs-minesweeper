import { useState, useEffect } from "react";

export const useUpdater = (delay: number) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((count) => count + 1);
    }, delay);

    return () => clearInterval(interval);
  }, [delay]);

  return count;
};
