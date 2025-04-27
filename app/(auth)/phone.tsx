import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  useColorScheme,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useSponsor } from "@/hooks/useSponsor";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import { useUser } from "@/context/userContext";
import { useVerify, VerifyType } from "@/hooks/useVerify";

export default function PhoneScreen() {
  const [phone, setPhone] = useState("");
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const { setAccessToken, accessToken } = useUser();

  //verify phone (momo) number
  const { data, error, isFetching, refetch } = useVerify(
    { type: "phone" as VerifyType, id: phone, provider: "mtn-gh" },
    accessToken,
    {
      queryKey: ["verify", { type: "phone", id: phone, provider: "mtn-gh" }],
      enabled: false,
      retry: false,
    }
  );

  const responseData = data?.data?.data;

  const tryVerify = async () => {
    if (phone.length !== 10) {
      Toast.show({ type: "error", text1: "Enter a 10‑digit phone #" });
      return;
    }

    const result = await refetch();
    if (result.data) {
      Toast.show({ type: "success", text1: "Verified!" });
    } else if (error?.response?.status === 404) {
      Toast.show({
        type: "error",
        text1: "Not found",
        text2: "Please check the number",
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Network error",
        text2: "Try again later",
      });
    }
  };

  React.useEffect(() => {
    if (phone.length === 10) tryVerify();
  }, [phone]);

  const handlePress = async () => {
    if (!phone.trim()) {
      Toast.show({ type: "error", text1: "Phone number required" });
      return;
    }

    try {
      const { data } = await refetch({ throwOnError: true });
      setAccessToken(data?.data?.accessToken);
      // console.log(data?.data, "data");

      Toast.show({ type: "success", text1: "Sponsor found" });
      setTimeout(() => {
        router.push({
          pathname: "/confirmation",
          params: { sponsor: JSON.stringify(data?.data?.user) },
        });
      }, 500);
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response?.status === 500) {
        Toast.show({
          type: "error",
          text1: "No sponsor found",
          text2: "Please check the phone number",
        });
      } else {
        setTimeout(() => {
          Toast.show({
            type: "error",
            text1: "Network error",
            text2: "Please check connection and try again",
          });
        }, 500);
      }
    }
  };

  return (
    <SafeAreaView
      className={`flex-1 px-3 py-3 ${isDarkMode ? "bg-black" : "bg-white"}`}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <MaterialCommunityIcons
          name="arrow-left"
          size={25}
          color={`${isDarkMode ? "white" : "black"}`}
        />
      </TouchableOpacity>
      <View className="flex-1 justify-center items-center h-full">
        <View className={`flex-1 justify-center items-center w-full`}>
          <Text
            className={`text-2xl font-semibold mb-8 text-center ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            Enter your phone (momo) number
          </Text>

          <TextInput
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            autoCapitalize="none"
            placeholderTextColor={isDarkMode ? "#CCCCCC" : "#666666"}
            className={`w-full max-w-sm border rounded-xl p-3 text-center text-lg ${
              isDarkMode ? "border-white text-white" : "border-black text-black"
            }`}
          />
          <Pressable
            className={`w-full max-w-sm mt-4 p-3 rounded-xl items-center ${
              isDarkMode ? "bg-white" : "bg-black"
            } ${isFetching ? "opacity-50" : ""} ${
              phone.length < 10 ? "opacity-50" : ""
            }`}
            onPress={handlePress}
            disabled={isFetching || phone.length < 10}
          >
            {isFetching ? (
              <ActivityIndicator color={isDarkMode ? "black" : "white"} />
            ) : (
              <Text
                className={`text-lg font-semibold ${
                  isDarkMode ? "text-black" : "text-white"
                }`}
              >
                CONTINUE
              </Text>
            )}
          </Pressable>
        </View>
      </View>
      <Toast />
    </SafeAreaView>
  );
}
