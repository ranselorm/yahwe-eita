import { Text, TextInput, Pressable, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function VerifyScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  return (
    <SafeAreaView
      className={`flex-1 justify-center items-center px-4 ${
        isDarkMode ? "bg-black" : "bg-white"
      }`}
    >
      {/* Header Text */}
      <Text
        className={`text-2xl font-semibold mb-8 ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        Verify your account
      </Text>

      {/* OTP Input Field */}
      <TextInput
        placeholder="ENTER OTP"
        placeholderTextColor={isDarkMode ? "#CCCCCC" : "#666666"}
        keyboardType="numeric"
        className={`w-full max-w-sm border rounded-xl p-3 text-center text-lg ${
          isDarkMode ? "border-white text-white" : "border-black text-black"
        }`}
      />

      {/* Verify Button */}
      <Pressable
        className={`w-full max-w-sm mt-4 p-3 rounded-xl items-center ${
          isDarkMode ? "bg-white" : "bg-black"
        }`}
      >
        <Text
          className={`text-lg font-semibold ${
            isDarkMode ? "text-black" : "text-white"
          }`}
        >
          VERIFY
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}
