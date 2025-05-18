import { View, Text, useColorScheme } from "react-native";

export default function StatsCard() {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <View
      className={`p-4 mt-8 rounded-xl ${
        isDarkMode ? "bg-dark-100" : "bg-gray-100"
      }`}
    >
      <Text
        className={`font-semibold ${isDarkMode ? "text-white" : "text-black"}`}
      >
        Stats
      </Text>
      <View className="flex-row justify-between items-center my-2">
        <Text className="text-base font-bold ">Earned this week</Text>
        <Text className="text-base font-bold">+GHS 5</Text>
      </View>
      <View className="flex-row justify-between items-center mt-2">
        <Text className="text-base font-bold "> Referrals this week</Text>
        <Text className="text-base font-bold">+2 People</Text>
      </View>

      {/* Progress Bar */}
      <View className="flex-row justify-between items-center my-2">
        <View className="h-2 w-[80%] bg-gray-300 mt-2 rounded-full overflow-hidden">
          <View className="h-full w-2/4 bg-orange-500" />
        </View>

        <Text className="text-base font-bold mt-2">Level 4</Text>
      </View>
    </View>
  );
}
