import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  useColorScheme,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useVerify, VerifyType } from "@/hooks/useVerify";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function PhoneScreen() {
  const [phone, setPhone] = useState("");
  const [channel, setChannel] = useState("mtn-gh");
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const { accessToken } = useSelector((s: RootState) => s.user);
  console.log(accessToken);

  const { data, error, isFetching, refetch } = useVerify(
    { type: "phone" as VerifyType, id: phone, provider: channel },
    accessToken,
    {
      queryKey: ["verify", { type: "phone", id: phone, provider: channel }],
      enabled: false,
      retry: false,
    }
  );

  const responseData = data?.data?.data;

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

  useEffect(() => {
    if (phone.length === 9) tryVerify();
  }, [phone]);

  return (
    <>
      <SafeAreaView
        className={`flex-1 px-3 py-3 ${isDarkMode ? "bg-black" : "bg-white"}`}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={25}
            color={isDarkMode ? "white" : "black"}
          />
        </TouchableOpacity>

        <View className="flex-1 justify-center items-center h-full">
          {/* <KeyboardAwareScrollView
            bottomOffset={10}
            className="flex-1"
            contentContainerStyle={{
              justifyContent: "center",
              flex: 1,
            }}
          > */}
          <View className="flex-1 justify-center items-center w-full">
            {/* Heading */}
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

            {/* Network Picker first */}
            <View
              className={`border rounded-xl h-[50px] w-full max-w-sm mb-6 justify-center relative ${
                isDarkMode ? "border-white" : "border-black"
              }`}
            >
              <Text
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-base"
                style={{ color: isDarkMode ? "white" : "black" }}
              >
                {channel ? channel.toUpperCase() : "SELECT YOUR NETWORK"}
              </Text>
              <Picker
                selectedValue={channel}
                onValueChange={(value) => setChannel(value)}
                style={{
                  opacity: 0,
                  width: "80%",
                  height: 50,
                  fontSize: 10,
                }}
              >
                <Picker.Item label="SELECT YOUR NETWORK" value="" />
                <Picker.Item label="MTN" value="mtn-gh" />
                <Picker.Item label="Vodafone" value="vodafone-gh" />
                <Picker.Item label="AirtelTigo" value="tigo-gh" />
              </Picker>
            </View>

            {/* Phone Input */}
            <View className="flex-row items-center space-x-2 gap-x-2 w-full max-w-sm">
              <View className="px-4 py-3 rounded-xl border border-gray-400 bg-gray-100">
                <Text className="text-lg text-black">+233</Text>
              </View>

              <TextInput
                value={phone}
                onChangeText={(text) => {
                  if (text.startsWith("0")) {
                    setPhone(text.slice(1));
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
              ) : null}
            </View>
          </View>
          {/* </KeyboardAwareScrollView> */}
        </View>

        {/* Bottom Button */}
        <Pressable
          className={`w-full max-w-sm mx-auto p-3 rounded-xl items-center mb-5 ${
            isDarkMode ? "bg-white" : "bg-black"
          } ${isFetching || phone.length < 9 ? "opacity-50" : ""} ${
            !responseData ? "opacity-50" : ""
          }`}
          onPress={() =>
            router.push({
              pathname: "/(auth)/register",
              params: {
                name: JSON.stringify(responseData?.name),
                phoneNumber: JSON.stringify(`233${phone}`),
                network: JSON.stringify(channel),
              },
            })
          }
          disabled={!responseData}
        >
          <Text
            className={`text-lg font-semibold ${
              isDarkMode ? "text-black" : "text-white"
            }`}
          >
            CONTINUE
          </Text>
        </Pressable>

        <Toast />
      </SafeAreaView>
    </>
  );
}
