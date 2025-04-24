// app/(auth)/status.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  useColorScheme,
  Alert,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import axios from "axios";
import { useResetPassword } from "@/hooks/useResetPassword";
import { router } from "expo-router";

export default function ResetPasswordScreen() {
  const [email, setEmail] = useState("");
  const isDarkMode = useColorScheme() === "dark";
  const resetMutation = useResetPassword();

  const handleReset = async () => {
    resetMutation.mutate(
      { email },
      {
        onSuccess: async (data) => {
          console.log("PASSWORD RESET EMAIL SENT!", data);
          Toast.show({
            type: "success",
            text1: "Password reset email sent successfully",
            text2: "We've just sent you an email to reset your password.",
            position: "top",
          });
          setTimeout(() => {
            router.replace("/(auth)/login");
          }, 2000);
        },
        onError: (error) => {
          console.error("Reset failed:", error.message);
          Toast.show({
            type: "error",
            text1: "Something went wrong!",
            text2: "Failed to reset password",
            position: "top",
          });
        },
      }
    );
  };

  if (resetMutation.isPending) {
    return (
      <SafeAreaView>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      className={`flex-1 items-center justify-center p-6 ${
        isDarkMode ? "bg-black" : "bg-white"
      }`}
    >
      <Text
        className={`text-2xl font-bold mb-4 ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        Reset Password
      </Text>

      <TextInput
        placeholder="Enter email"
        value={email}
        onChangeText={(value) => setEmail(value)}
        keyboardType="email-address"
        className={`border rounded-xl p-3 text-base text-center ${
          isDarkMode
            ? "border-white text-white"
            : "border-secondary-100 text-secondary-100"
        }`}
      />
      <Pressable
        className={`
          w-full max-w-sm mt-4 p-3 rounded-xl items-center
          ${isDarkMode ? "bg-white" : "bg-black"}
          ${resetMutation.isPending ? "opacity-50" : ""}
        `}
        disabled={resetMutation.isPending}
        onPress={handleReset}
      >
        {resetMutation.isPending ? (
          <ActivityIndicator color={isDarkMode ? "black" : "white"} />
        ) : (
          <Text
            className={`${
              isDarkMode ? "text-black" : "text-white"
            } font-semibold`}
          >
            Reset Password
          </Text>
        )}
      </Pressable>

      <Toast />
    </SafeAreaView>
  );
}
