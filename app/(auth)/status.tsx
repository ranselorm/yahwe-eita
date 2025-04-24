// app/(auth)/status.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import axios from "axios";
import { useRegister } from "@/hooks/useRegister";
import { useUser } from "@/context/userContext";
import { router, useLocalSearchParams } from "expo-router";

export default function StatusScreen() {
  const isDark = useColorScheme() === "dark";
  const { accessToken } = useUser();
  const { reference, payload } = useLocalSearchParams<{
    reference: string;
    payload: string;
  }>();
  const parsedPayload = payload ? JSON.parse(payload) : {};
  console.log(parsedPayload, reference, "in status");

  const [timeLeft, setTimeLeft] = useState(30);
  const [isChecking, setIsChecking] = useState(false);
  const [done, setDone] = useState(false);

  // countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // register mutation (validateOnly = false)
  const registerMutation = useRegister(accessToken, false);

  const checkStatus = async () => {
    if (!reference) return;
    setIsChecking(true);
    try {
      const { data } = await axios.get(
        "https://yahwe-eita-api.azurewebsites.net/api/payment/fee/status",
        {
          params: { reference },
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (data.status === "COMPLETED") {
        setDone(true);
        Toast.show({ type: "success", text1: "Payment complete" });
        registerMutation.mutate(parsedPayload, {
          onSuccess: () => router.replace("/(tabs)"),
          onError: (err) =>
            Toast.show({
              type: "error",
              text1: "Registration failed",
              text2: err.message,
            }),
        });
      } else {
        Toast.show({ type: "info", text1: "Payment still pending" });
      }
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Error checking payment",
        text2: err.message,
      });
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <SafeAreaView
      className={`flex-1 items-center justify-center p-6 ${
        isDark ? "bg-black" : "bg-white"
      }`}
    >
      <Text
        className={`text-2xl font-bold mb-4 ${
          isDark ? "text-white" : "text-black"
        }`}
      >
        Payment Status
      </Text>

      <Text
        className={`text-lg mb-6 ${isDark ? "text-gray-300" : "text-gray-700"}`}
      >
        {timeLeft > 0
          ? `Please wait ${timeLeft}s before checking`
          : done
          ? "Done ✅"
          : "Ready to check"}
      </Text>

      <Pressable
        className={`
          w-full max-w-sm mt-4 p-3 rounded-xl items-center
          ${isDark ? "bg-white" : "bg-black"}
          ${done || timeLeft > 0 || isChecking ? "opacity-50" : ""}
        `}
        disabled={done || timeLeft > 0 || isChecking}
        onPress={checkStatus}
      >
        {isChecking ? (
          <ActivityIndicator color={isDark ? "black" : "white"} />
        ) : (
          <Text
            className={`${isDark ? "text-black" : "text-white"} font-semibold`}
          >
            {done ? "Completed" : "Check Status"}
          </Text>
        )}
      </Pressable>

      <Toast />
    </SafeAreaView>
  );
}
