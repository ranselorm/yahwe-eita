// CountdownContext.tsx
import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface CountdownContextType {
  startTime: number; // Start time for countdown (timestamp)
  endTime: number; // The timestamp when the countdown expires
  setEndTime: (time: number) => void; // Function to set the endTime
  resetCountdown: () => void; // Function to reset the countdown
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
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [endTime, setEndTime] = useState<number>(
    Date.now() + 8 * 24 * 60 * 60 * 1000
  ); // Default 8 days from now

  useEffect(() => {
    // Fetch saved endTime from AsyncStorage when the app starts
    const fetchEndTime = async () => {
      const savedEndTime = await AsyncStorage.getItem("endTime");
      if (savedEndTime) {
        setEndTime(Number(savedEndTime)); // Use the saved endTime if available
      }
    };
    fetchEndTime();
  }, []);

  // Function to reset the countdown (used for registration)
  const resetCountdown = async () => {
    const newEndTime = Date.now() + 8 * 24 * 60 * 60 * 1000; // Start from 8 days from now
    setEndTime(newEndTime);
    await AsyncStorage.setItem("endTime", String(newEndTime)); // Save to AsyncStorage
  };

  return (
    <CountdownContext.Provider
      value={{ startTime, endTime, setEndTime: resetCountdown, resetCountdown }}
    >
      {children}
    </CountdownContext.Provider>
  );
};
