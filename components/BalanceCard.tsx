import { View, Text, Pressable, useColorScheme } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function BalanceCard() {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <View
      className={`p-4 rounded-xl mt-8 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <Text
        className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
      >
        Available Balance:
      </Text>
      <Text
        className={`text-3xl font-bold ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        GHS 80.00
      </Text>

      {/* Action Buttons */}
      <View className="flex-row justify-between mt-4">
        {[
          { label: "Topup", icon: "add" },
          { label: "Withdraw", icon: "arrow-downward" },
          { label: "History", icon: "history" },
          { label: "Details", icon: "info" },
        ].map((item, index) => (
          <View key={index} className="items-center">
            <Pressable className="w-12 h-12 rounded-full bg-primary items-center justify-center">
              <MaterialIcons name={item.icon} size={24} color="white" />
            </Pressable>
            <Text className="text-sm mt-1 text-gray-500">{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
