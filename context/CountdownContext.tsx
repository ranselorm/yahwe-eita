// CountdownContext.tsx
import React, { createContext, useContext, useState } from "react";

interface CountdownContextType {
  endTime: number;
  resetCountdown: () => void;
}

const CountdownContext = createContext<CountdownContextType | undefined>(
  undefined
);

export const useCountdown = () => {
  const context = useContext(CountdownContext);
  if (!context) {
    throw new Error("useCountdown must be used within a CountdownProvider");
  }
  return context;
};

interface CountdownProviderProps {
  children: React.ReactNode;
}

export const CountdownProvider: React.FC<CountdownProviderProps> = ({
  children,
}) => {
  // Set endTime to 8 days from now
  const [endTime, setEndTime] = useState<number>(
    Date.now() + 8 * 24 * 60 * 60 * 1000
  );

  // You can call resetCountdown to restart the timer from 8 days.
  const resetCountdown = () => {
    setEndTime(Date.now() + 8 * 24 * 60 * 60 * 1000);
  };

  return (
    <CountdownContext.Provider value={{ endTime, resetCountdown }}>
      {children}
    </CountdownContext.Provider>
  );
};
