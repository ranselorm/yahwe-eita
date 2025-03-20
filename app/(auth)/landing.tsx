import { View, Text, Pressable, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function Landing() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  return (
    <SafeAreaView
      className={`flex-1 justify-center items-center px-4 py-20 ${
        isDarkMode ? "bg-black" : "bg-white"
      }`}
    >
      <View className="items-center px-4 flex-1 justify-between w-full">
        <View>
          <View className="mb-20 items-center">
            <MaterialCommunityIcons
              name="account-outline"
              size={38}
              color="black"
              className="mb-4"
            />
            <Text
              className={`text-2xl font-bold ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              YAHWE-EITA
            </Text>
          </View>

          <View className="flex-row gap-x-2 mb-4 mx-auto">
            <View
              className={`h-2 w-2 rounded-full ${
                isDarkMode ? "bg-gray-400" : "bg-black"
              }`}
            />
            <View
              className={`h-2 w-2 rounded-full ${
                isDarkMode ? "bg-gray-400" : "bg-black"
              }`}
            />

            <View
              className={`h-2 w-2 rounded-full ${
                isDarkMode ? "bg-gray-400" : "bg-black"
              }`}
            />
            <View
              className={`h-2 w-2 rounded-full ${
                isDarkMode ? "bg-gray-400" : "bg-white border border-black"
              }`}
            />
          </View>

          <Text
            className={`mb-6 text-center text-2xl font-bold px-16 mt-4 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            Create your account to start winning
          </Text>
        </View>

        <View className="w-full max-w-sm">
          <Pressable
            className={`border rounded-xl p-3 items-center ${
              isDarkMode ? "border-white" : "border-black"
            }`}
            onPress={() => router.push("/verify")}
          >
            <Text
              className={`text-lg font-semibold ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              CREATE AN ACCOUNT
            </Text>
          </Pressable>

          <Link href="/login" asChild>
            <Pressable
              className={`mt-4 p-3 rounded-xl items-center ${
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
      </View>
    </SafeAreaView>
  );
}
