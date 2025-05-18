import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  useColorScheme,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useResetPassword } from "@/hooks/useResetPassword";
import { router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "react-native";

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
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor="transparent"
        translucent
      />

      <SafeAreaView
        className={`flex-1 p-6 ${isDarkMode ? "bg-black" : "bg-white"}`}
      >
        <View className="flex-row justify-between mb-5 items-center">
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={25}
              color={`${isDarkMode ? "white" : "black"}`}
            />
          </TouchableOpacity>
        </View>
        <View className="flex-1 justify-center">
          <Text
            className={`text-2xl font-bold mb-4 text-center ${
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
          w-full mt-8 p-3 rounded-xl items-center mx-auto
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
        </View>

        <Toast />
      </SafeAreaView>
    </>
  );
}
