import { View, Text } from "react-native";
interface ProgressBarProps {
  progress: number;
  level: number;
}

export default function ProgressBar({ progress, level }: ProgressBarProps) {
  return (
    <View className="mt-2 flex-row justify-between items-center">
      <View className="h-2 w-[70%] bg-gray-300 rounded-full overflow-hidden">
        <View
          style={{ width: `${progress}%` }}
          className="h-full bg-orange-500"
        />
      </View>
      <Text className="font-semibold mt-1">Level {level}</Text>
    </View>
  );
}
