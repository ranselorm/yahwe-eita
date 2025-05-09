import React, { useEffect, useState } from "react";
import moment from "moment";
import { Text } from "react-native";

interface CountdownProps {
  createdAt: string; // e.g. "2025-04-07T14:23:37.365Z"
}

const Countdown: React.FC<CountdownProps> = ({ createdAt }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const creationTime = moment.utc(createdAt).local();
    const target = creationTime.clone().add(8, "days");

    const updateCountdown = () => {
      const now = moment();
      const duration = moment.duration(target.diff(now));

      if (duration.asMilliseconds() <= 0) {
        setTimeLeft("00d 00h 00m 00s");
        return;
      }

      const days = Math.floor(duration.asDays());
      const hours = duration.hours();
      const minutes = duration.minutes();
      const seconds = duration.seconds();

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [createdAt]);

  return <Text style={{ color: "white", fontWeight: "600" }}>{timeLeft}</Text>;
};

export default Countdown;
