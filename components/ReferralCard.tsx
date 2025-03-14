import { View, Text, Pressable, useColorScheme } from "react-native";
import ProgressBar from "./ProgressBar";

export default function ReferralCard() {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <View
      className={`p-4 mt-4 rounded-xl ${
        isDarkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <View className="flex-row justify-between items-center">
        <Text
          className={`text-sm font-semibold ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          Direct Referral
        </Text>
        <Text className="bg-accent text-white px-3 py-1 rounded-full text-xs">
          Active
        </Text>
      </View>

      {/* Referral Info */}
      <View className="p-4 mt-2 rounded-lg border border-gray-400">
        <View className="flex-row justify-between">
          <Text
            className={`text-lg font-semibold ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            Seth Agyemang
          </Text>
        </View>
        <Text className="text-gray-500 mt-1">Invited: 3</Text>

        {/* Progress Bar */}
        <ProgressBar progress={40} level={6} />
      </View>
    </View>
  );
}
