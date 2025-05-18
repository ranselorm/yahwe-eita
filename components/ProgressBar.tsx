import { View, Text } from "react-native";
interface ProgressBarProps {
  progress: number;
  level: number;
  onTimeUp?: boolean;
}

export default function ProgressBar({
  progress,
  level,
  onTimeUp,
}: ProgressBarProps) {
  return (
    <View className="flex-row justify-between items-center px-2 mt-4">
      <View className="h-2 w-[80%] bg-gray-300 rounded-full overflow-hidden">
        <View
          style={{ width: `${progress * 10}%` }}
          className={`h-full  ${onTimeUp ? "" : "bg-primary"}`}
        />
      </View>
      <Text className="dark:text-black font-semibold text-white">Level {level}</Text>
    </View>
  );
}
