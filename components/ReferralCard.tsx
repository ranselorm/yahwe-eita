import { View, Text, Pressable, useColorScheme } from "react-native";
import ProgressBar from "./ProgressBar";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
      <View className="mt-2">
        <View className="flex-row justify-between items-center my-4">
          <Text
            className={`text-xl font-semibold ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            Seth Agyemang
          </Text>
          <MaterialCommunityIcons
            name="account-check-outline"
            size={20}
            color={`${isDarkMode ? "white" : "black"}`}
          />
        </View>
        <Text className="text-black mb-4 font-semibold">Invited: 3</Text>

        {/* Progress Bar */}
        <ProgressBar progress={60} level={6} />
      </View>
    </View>
  );
}
