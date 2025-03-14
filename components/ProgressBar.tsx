import { View, Text } from "react-native";
interface ProgressBarProps {
  progress: number;
  level: number;
}

export default function ProgressBar({ progress, level }: ProgressBarProps) {
  return (
    <View className="mt-2">
      <View className="h-2 w-full bg-gray-300 rounded-full overflow-hidden">
        <View
          style={{ width: `${progress}%` }}
          className="h-full bg-orange-500"
        />
      </View>
      <Text className="text-gray-500 mt-1">Level {level}</Text>
    </View>
  );
}
