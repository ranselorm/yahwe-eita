import React, { useEffect, useState } from "react";
import moment from "moment";
import { Text } from "react-native";

interface CountdownProps {
  createdAt: string;
}

const Countdown: React.FC<CountdownProps> = ({ createdAt }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    // Convert createdAt to local time, then get the start of that day.
    // Day 1 is the creation day. Adding 7 days lands us at the beginning of day 8,
    // so we then use endOf('day') to expire at midnight on the 8th day.
    const target = moment(createdAt)
      .local()
      .startOf("day")
      .add(7, "days")
      .endOf("day");

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
