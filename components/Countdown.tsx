import React, { useEffect, useState } from "react";
import moment from "moment";
import { Text } from "react-native";

interface CountdownProps {
  createdAt: string; // ISO string
}

const Countdown: React.FC<CountdownProps> = ({ createdAt }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const endTime = moment(createdAt).add(8, "days");
    const updateCountdown = () => {
      const now = moment();
      const duration = moment.duration(endTime.diff(now));

      if (duration.asMilliseconds() <= 0) {
        setTimeLeft("00d 00h 00m 00s");
        return;
      }

      setTimeLeft(
        `${duration.days()}d ${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`
      );
    };

    updateCountdown(); // initial render
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [createdAt]);

  return <Text className="text-white font-semibold">{timeLeft}</Text>;
};

export default Countdown;
