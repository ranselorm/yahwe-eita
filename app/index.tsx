import { Text, TouchableOpacity } from "react-native";
import { useTheme } from "../context/ThemeProvider";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { theme, toggleTheme } = useTheme();

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white dark:bg-black">
      <Text className="text-black dark:text-white">Current Theme: {theme}</Text>
      <TouchableOpacity
        className="mt-4 px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-lg"
        onPress={toggleTheme}
      >
        <Text className="text-black dark:text-white">Toggle Theme</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
