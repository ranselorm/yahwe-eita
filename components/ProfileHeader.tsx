import { View, Text, Pressable, useColorScheme } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function ProfileHeader() {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <View className="items-center mt-6">
      {/* Profile Picture */}
      <View className="w-16 h-16 rounded-full border border-gray-400 flex items-center justify-center">
        <Text className="text-xl font-semibold">N</Text>
      </View>

      {/* User Info */}
      <Text
        className={`text-xl font-semibold mt-2 ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        Nana Kwame
      </Text>
      <Text
        className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
      >
        testemail@email.com • +233 123 456 7890
      </Text>
      <Text
        className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
      >
        Level 4
      </Text>

      {/* Settings Button */}
      <Pressable className="absolute top-0 right-0">
        <MaterialIcons
          name="settings"
          size={24}
          color={isDarkMode ? "white" : "black"}
        />
      </Pressable>
    </View>
  );
}
