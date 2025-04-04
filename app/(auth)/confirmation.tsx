import { Text, View, useColorScheme, Pressable, Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";

import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ConfirmationScreen() {
  const { sponsor } = useLocalSearchParams();
  const sponsorData = sponsor ? JSON.parse(sponsor as string) : null;
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  console.log(sponsorData);
  return (
    <SafeAreaView
      className={`flex-1  px-6 py-6 ${isDarkMode ? "bg-black" : "bg-white"}`}
    >
      <View className="flex-1 justify-center items-center">
        <View className="items-center justify-center">
          <Text
            className={`text-2xl font-semibold ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            Your sponsor
          </Text>
          <Text
            className={`text-2xl font-semibold ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            {sponsorData?.data?.name}
          </Text>
          <Text
            className={`text-2xl font-semibold ${
              isDarkMode ? "text-black" : "text-black"
            }`}
          >
            {sponsorData?.data?.email}
          </Text>
        </View>
      </View>
      <Pressable
        className={`w-full max-w-sm mt-4 p-3 rounded-xl items-center ${
          isDarkMode ? "bg-white" : "bg-black"
        } `}
        onPress={() => Alert.alert("BUTTON PRESSED! Hi BABE")}
        //   disabled={verifyMutation.isPending}
      >
        <Text
          className={`text-lg font-semibold ${
            isDarkMode ? "text-black" : "text-white"
          }`}
        >
          CONTINUE
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}
