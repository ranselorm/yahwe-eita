// app/(auth)/status.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  useColorScheme,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import axios from "axios";
import { useRegister } from "@/hooks/useRegister";
import { useUser } from "@/context/userContext";
import { router, useLocalSearchParams } from "expo-router";
import { jwtDecode } from "jwt-decode";
import { saveUserData } from "@/utils";
import { MaterialIcons } from "@expo/vector-icons";
import PendingDots from "@/components/PendingDots";

export default function StatusScreen() {
  const isDark = useColorScheme() === "dark";
  const { accessToken } = useUser();
  const { reference, payload } = useLocalSearchParams<{
    reference: string;
    payload: string;
  }>();
  const parsedPayload = payload ? JSON.parse(payload) : {};

  const [timeLeft, setTimeLeft] = useState(30);
  const [isChecking, setIsChecking] = useState(false);
  const [done, setDone] = useState(false);
  const [isStillPending, setIsStillPending] = useState(false);
  const { setUser } = useUser();

  // Countdown timer
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

  // Register mutation
  const registerMutation = useRegister(accessToken, false);
  const updateUserSession = async (responseData: any) => {
    try {
      const decodedToken: any = jwtDecode(responseData?.data?.id_token);
      const updatedUser = {
        isLoggedIn: true,
        name: `${decodedToken.name}`,
        id: decodedToken.sub,
        email: decodedToken.email,
        picture: decodedToken.picture,
        exp: decodedToken.exp,
        token: responseData?.data?.access_token,
      };
      setUser(updatedUser);
      await saveUserData(updatedUser);
    } catch (error) {
      console.error("Error updating session:", error);
      Alert.alert("Error", "Failed to update user session.");
    }
  };

  console.log(parsedPayload, "IN STATUS");
  const checkStatus = async () => {
    if (!reference) return;
    setIsChecking(true);
    try {
      const { data } = await axios.get(
        "https://yahwe-eita-api.azurewebsites.net/api/fee/status",
        {
          params: { reference },
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      console.log(data, "FEE DATA IN STATUS");
      if (data?.data?.status === "COMPLETED") {
        setDone(true);
        Toast.show({ type: "success", text1: "Payment complete" });
        registerMutation.mutate(parsedPayload, {
          onSuccess: async (data) => {
            updateUserSession(data);
            router.replace("/(tabs)");
          },
          onError: (err) =>
            Toast.show({
              type: "error",
              text1: "Registration failed",
              text2: err.message,
            }),
        });
      } else {
        Toast.show({ type: "info", text1: "Payment still pending" });
        setIsStillPending(true); //Mark payment still pending
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

  if (registerMutation.isPending) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="small" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      className={`flex-1 items-center p-6 ${isDark ? "bg-black" : "bg-white"}`}
    >
      <View className="flex-1 items-center px-6 w-full">
        {/* Icon / Animation */}
        {isStillPending ? (
          <MaterialIcons name="error-outline" size={62} color="#dc6115" />
        ) : (
          <PendingDots />
        )}

        {/* Title */}
        {!isStillPending && (
          <Text
            className={`text-lg font-bold mt-4  ${
              isDark ? "text-white" : "text-black"
            }`}
          >
            Pending Payment
          </Text>
        )}

        {/* Description */}
        <Text
          className={`text-base text-center mt-4 ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          {isStillPending
            ? "If you didn’t see a payment pop-up, dial *170#, choose 'My Wallet' > 'My Approvals' to approve your transaction manually."
            : "Your payment is pending. Authorize this payment and click the button below."}{" "}
          {timeLeft}
        </Text>

        {/* Button */}
        <Pressable
          className={`w-full mt-8 p-3 rounded-xl items-center bg-primary ${
            done || timeLeft > 0 || isChecking ? "opacity-50" : ""
          }`}
          disabled={done || timeLeft > 0 || isChecking}
          onPress={checkStatus}
        >
          {isChecking ? (
            <ActivityIndicator color={isDark ? "black" : "white"} />
          ) : (
            <Text
              className={`text-lg ${
                isDark ? "text-black" : "text-white uppercase"
              } font-semibold`}
            >
              Check Status
            </Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
