import { View, Text, Pressable, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

export default function Landing() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  return (
    <SafeAreaView
      className={`flex-1 justify-center items-center px-4 ${
        isDarkMode ? "bg-black" : "bg-white"
      }`}
    >
      {/* Logo and App Name */}
      <View className="mb-8 items-center">
        <Text
          className={`text-3xl font-bold ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          YAHWE-EITA
        </Text>
      </View>

      {/* Dots for indicator */}
      <View className="flex-row space-x-1 mb-4">
        <View
          className={`h-2 w-2 rounded-full ${
            isDarkMode ? "bg-gray-400" : "bg-gray-600"
          }`}
        />
        <View
          className={`h-2 w-2 rounded-full ${
            isDarkMode ? "bg-gray-200" : "bg-gray-400"
          }`}
        />
        <View
          className={`h-2 w-2 rounded-full ${
            isDarkMode ? "bg-white" : "bg-black"
          }`}
        />
      </View>

      {/* Tagline */}
      <Text
        className={`text-lg mb-6 text-center ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        Create your account to start winning
      </Text>

      {/* Buttons */}
      <View className="w-full max-w-sm">
        {/* Create Account Button */}
        <Link href="/register" asChild>
          <Pressable
            className={`border-2 rounded-lg p-4 items-center ${
              isDarkMode ? "border-white" : "border-black"
            }`}
          >
            <Text
              className={`text-lg font-semibold ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              CREATE AN ACCOUNT
            </Text>
          </Pressable>
        </Link>

        {/* Login Button */}
        <Link href="/verify" asChild>
          <Pressable
            className={`mt-4 p-4 rounded-lg items-center ${
              isDarkMode ? "bg-white" : "bg-black"
            }`}
          >
            <Text
              className={`text-lg font-semibold ${
                isDarkMode ? "text-black" : "text-white"
              }`}
            >
              LOGIN
            </Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}
