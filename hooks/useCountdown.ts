import { useEffect, useState } from "react";

export const useCountdown = (initialSeconds = 90) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (!active) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [active]);

  const reset = () => {
    setSecondsLeft(initialSeconds);
    setActive(true);
  };

  return {
    secondsLeft,
    isExpired: !active,
    resetCountdown: reset,
  };
};
