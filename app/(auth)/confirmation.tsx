import { Text, View, useColorScheme, Pressable, Alert } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";

import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@/context/userContext";

export default function ConfirmationScreen() {
  const { sponsor } = useLocalSearchParams();
  const sponsorData = sponsor ? JSON.parse(sponsor as string) : null;
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const { setSponsorId } = useUser();

  console.log(sponsorData);

  const sponsorId = sponsorData?.data?.sponsorId;
  console.log(sponsorId && sponsorId);

  const handlePress = () => {
    setSponsorId(sponsorId);
    router.push("/register");
  };
  return (
    <SafeAreaView
      className={`flex-1  px-6 py-6 ${isDarkMode ? "bg-black" : "bg-white"}`}
    >
      <View className="flex-1 justify-center items-center">
        <View className="mb-8 items-center">
          <AntDesign
            name="checkcircleo"
            size={40}
            color="#22c55e"
            className="text-green-500"
          />
          <Text
            className={`text-lg font-semibold mt-4 ${
              isDarkMode ? "text-black" : "text-black"
            }`}
          >
            Successfully Verified Your Sponsor
          </Text>
        </View>
        <View className="items-center justify-center">
          <Text
            className={`text-3xl font-semibold uppercase ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            {sponsorData?.data?.name}
          </Text>
          <Text
            className={`text-lg font-semibold ${
              isDarkMode ? "text-black" : "text-black"
            }`}
          >
            {sponsorData?.data?.email}
          </Text>
        </View>
      </View>
      <Pressable
        className={`w-full max-w-sm mt-4 p-3 rounded-xl items-center mx-auto ${
          isDarkMode ? "bg-white" : "bg-black"
        } `}
        onPress={handlePress}
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
