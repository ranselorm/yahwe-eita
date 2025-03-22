// Countdown.tsx
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useCountdown } from "@/context/CountdownContext";

const Countdown: React.FC = () => {
  const { endTime } = useCountdown();
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const remaining = endTime - now;

      if (remaining <= 0) {
        setTimeLeft("Time is up!");
        clearInterval(interval);
        return;
      }

      const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  return (
    <View style={{ backgroundColor: "black", padding: 16 }}>
      <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
        {timeLeft}
      </Text>
    </View>
  );
};

export default Countdown;
