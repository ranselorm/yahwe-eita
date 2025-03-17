import React, { useState } from "react";
import {
  View,
  TextInput,
  Pressable,
  Text,
  useColorScheme,
  ActivityIndicator,
} from "react-native";
import { useLogin } from "@/hooks/useLogin";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/context/ThemeProvider";
import { saveUserData } from "@/utils";

export default function LoginScreen() {
  const [email, setEmail] = useState("gbedzrah1@gmail.com");
  const [password, setPassword] = useState("p@ssw0rd123");
  const router = useRouter();
  const mutation = useLogin();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const { theme, toggleTheme } = useTheme();

  const handleLogin = () => {
    mutation.mutate(
      { email, password },
      {
        onSuccess: async (data) => {
          await saveUserData(data); // Persist user data
          console.log("Login successful!", data);
          router.replace("/(tabs)");
        },
        onError: (error) => {
          console.error("Login failed:", error.message);
        },
      }
    );
  };

  if (mutation.isPending)
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size={"large"} />
      </SafeAreaView>
    );

  return (
    <SafeAreaView
      className={`flex-1 ${
        isDarkMode ? "bg-black" : "bg-white"
      } justify-center items-center w-full px-6`}
    >
      <TextInput
        placeholder="Email"
        placeholderTextColor={isDarkMode ? "#CCCCCC" : "#666666"}
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
        autoCapitalize="none"
        className={`border rounded-xl p-3 text-base text-center w-full ${
          isDarkMode
            ? "border-white text-white"
            : "border-secondary-100 text-secondary-100"
        }`}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor={isDarkMode ? "#CCCCCC" : "#666666"}
        keyboardType="email-address"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className={`border rounded-xl p-3 text-base text-center w-full mt-4 ${
          isDarkMode
            ? "border-white text-white"
            : "border-secondary-100 text-secondary-100"
        }`}
      />

      <Pressable
        className={`w-full max-w-sm mt-8 p-3 rounded-xl items-center ${
          isDarkMode ? "bg-white" : "bg-secondary-100"
        }`}
        // disabled={!termsAccepted}
        onPress={handleLogin}
      >
        <Text
          className={`text-lg font-semibold ${
            isDarkMode ? "text-secondary-100" : "text-white"
          }`}
        >
          Login
        </Text>
      </Pressable>
      {mutation.isError && <Text style={{ color: "red" }}>Login failed</Text>}
    </SafeAreaView>
  );
}
