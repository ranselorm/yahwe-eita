import { View, Text, ScrollView, useColorScheme } from "react-native";

export default function ReferralList() {
  const isDarkMode = useColorScheme() === "dark";
  const referrals = ["Janet Addo", "Seth Agyemang", "Andrew Peters"];

  return (
    <View className="mt-8">
      <View className="flex-row justify-between">
        <Text
          className={`font-semibold text-lg ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          My Referrals
        </Text>
        <Text className="text-orange-500 font-semibold">See All</Text>
      </View>

      {/* Referral List */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mt-2"
      >
        {referrals.map((name, index) => (
          <View
            key={index}
            className={`w-20 h-20 rounded-lg items-center justify-center m-2 ${
              isDarkMode ? "bg-gray-800" : "bg-gray-200"
            }`}
          >
            <Text className={isDarkMode ? "text-white" : "text-black"}>
              {name}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
