import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  useColorScheme,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
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
  const { accessToken } = useUser();

  console.log({ phone });

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
  console.log(responseData);

  const tryVerify = async () => {
    if (phone.length !== 9) {
      Toast.show({ type: "error", text1: "Enter a 10‑digit phone #" });
      return;
    }

    const result = await refetch();
    if (result.data) {
      Toast.show({ type: "success", text1: "You are registered" });
    } else if (error?.response?.status === 500) {
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
    if (phone.length === 9) tryVerify();
  }, [phone]);

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
            className={`text-2xl font-semibold mb-2 text-center ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            Enter your phone (momo) number
          </Text>
          <Text
            className={`text-lg mb-8 text-center px-20 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            Enter your MobileMoney number without the 0
          </Text>

          <View className="flex-row items-center space-x-2 px-4 gap-x-4">
            {/* +233 box */}
            <View className="px-4 py-3 rounded-xl border border-gray-400 bg-gray-100">
              <Text className="text-lg text-black">+233</Text>
            </View>
            {/* Phone input */}
            <TextInput
              value={phone}
              onChangeText={(text) => {
                if (text.startsWith("0")) {
                  setPhone(text.slice(1)); // remove leading 0
                } else {
                  setPhone(text);
                }
              }}
              keyboardType="phone-pad"
              autoCapitalize="none"
              placeholder="Enter phone number"
              maxLength={9}
              placeholderTextColor={isDarkMode ? "#CCCCCC" : "#666666"}
              className={`flex-1 border rounded-xl p-3 text-center text-lg ${
                isDarkMode
                  ? "border-white text-white"
                  : "border-black text-black"
              }`}
            />
          </View>
          <View className="mt-6">
            {isFetching ? (
              <ActivityIndicator />
            ) : responseData ? (
              <Text className="text-center font-bold text-lg">
                {responseData?.name}
              </Text>
            ) : (
              ""
            )}
          </View>
        </View>
      </View>
      <Toast />
      <Pressable
        className={`w-full max-w-sm  mx-auto p-3 rounded-xl items-center ${
          isDarkMode ? "bg-white" : "bg-black"
        } ${isFetching ? "opacity-50" : ""} ${
          phone.length < 9 ? "opacity-50" : ""
        }`}
        onPress={() =>
          router.push({
            pathname: "/(auth)/register",
            params: { fullName: JSON.stringify(data?.data?.name) },
          })
        }
        disabled={!responseData}
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
    </SafeAreaView>
  );
}
