import React, { useEffect, useRef } from "react";

export default function useThrottledResize(
  callback: () => void,
  delay: number
) {
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (!timeoutRef.current) {
        timeoutRef.current = setTimeout(() => {
          callback();
          timeoutRef.current = null;
        }, delay);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [callback, delay]);
}
