import { View, Text, Pressable, useColorScheme } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function BalanceCard() {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <View
      className={`p-4 rounded-xl mt-8 ${
        isDarkMode ? "bg-dark-100" : "bg-gray-100"
      }`}
    >
      <Text
        className={`text-base mb-3 ${isDarkMode ? "text-white" : "text-black"}`}
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
      <View className="flex-row justify-between mt-6">
        {[
          { label: "Topup", icon: "add" },
          { label: "Withdraw", icon: "arrow-downward" },
          { label: "History", icon: "history" },
          { label: "Details", icon: "info" },
        ].map((item, index) => (
          <View key={index} className="items-center">
            <Pressable
              className={`w-12 h-12 rounded-full items-center justify-center ${
                item.label === "Topup" ? "bg-primary" : "bg-white"
              }`}
            >
              {item.label !== "Details" ? (
                <MaterialIcons
                  name={item.icon}
                  size={24}
                  color={`${item.label === "Topup" ? "white" : "black"}`}
                />
              ) : (
                <Ionicons name="menu-outline" size={24} color="black" />
              )}
            </Pressable>
            <Text className="text-sm mt-1 text-gray-500">{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
