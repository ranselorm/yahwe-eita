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
import { StatusBar } from "react-native";
import { setAccessToken } from "@/store/userSlice";
import { useDispatch } from "react-redux";

export default function SponsorScreen() {
  const [phone, setPhone] = useState("");
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  console.log(phone, "phone number");
  const isValidPhone = phone.length === 12 && phone.startsWith("233");

  const dispatch = useDispatch();

  const phoneNumber = `233${phone}`;

  console.log(phoneNumber, "phone number");

  const { isLoading, refetch } = useSponsor(phoneNumber, {
    queryKey: ["sponsor", phoneNumber],
    enabled: false,
  });

  const handlePress = async () => {
    if (!phone.trim()) {
      Toast.show({ type: "error", text1: "Phone number required" });
      return;
    }

    try {
      const { data } = await refetch({ throwOnError: true });
      dispatch(setAccessToken(data?.data?.accessToken));

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
    <>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor="transparent"
        translucent
      />

      <SafeAreaView
        className={`flex-1 p-6 ${isDarkMode ? "bg-black" : "bg-white"}`}
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
              className={`text-xl font-semibold mb-8 text-center max-w-sm ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              Enter your sponsor's phone number without the 0
            </Text>
            <View className="flex-row items-center space-x-2 gap-x-2 max-w-sm w-full">
              <View className="px-4 py-3 rounded-xl border border-gray-400 bg-gray-100">
                <Text className="text-lg text-black">+233</Text>
              </View>

              <TextInput
                value={phone}
                onChangeText={(text) => {
                  if (text.startsWith("0")) {
                    setPhone(text.slice(1));
                  } else {
                    setPhone(`${text}`);
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
            <Pressable
              className={`w-full max-w-sm mt-6 p-3 rounded-xl items-center ${
                isDarkMode ? "bg-white" : "bg-black"
              } ${isLoading ? "opacity-50" : ""} ${
                phone.length < 9 ? "opacity-50" : ""
              }`}
              onPress={handlePress}
              disabled={isLoading || phone.length < 9}
            >
              {isLoading ? (
                <ActivityIndicator color={isDarkMode ? "black" : "white"} />
              ) : (
                <Text
                  className={`text-lg font-semibold ${
                    isDarkMode ? "text-black" : "text-white"
                  }`}
                >
                  VERIFY
                </Text>
              )}
            </Pressable>
          </View>
        </View>
        <Toast />
      </SafeAreaView>
    </>
  );
}
