import {
  Text,
  View,
  useColorScheme,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { setSponsorId } from "@/store/userSlice";

export default function ConfirmationScreen() {
  const { sponsor } = useLocalSearchParams();
  const sponsorData = sponsor ? JSON.parse(sponsor as string) : null;
  const isDarkMode = useColorScheme() === "dark";
  const sponsorId = sponsorData?.id;

  const dispatch = useDispatch();

  const handlePress = () => {
    dispatch(setSponsorId(sponsorId));
    router.push("/phone");
  };

  return (
    <>
      <SafeAreaView
        className={`flex-1 p-3 ${isDarkMode ? "bg-black" : "bg-white"}`}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={25}
            color={`${isDarkMode ? "white" : "black"}`}
          />
        </TouchableOpacity>
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
              Successfully Verified Your Sponsor As
            </Text>
          </View>
          <View className="items-center justify-center">
            <Text
              className={`text-3xl font-semibold uppercase ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              {sponsorData?.name}
            </Text>
            <Text
              className={`text-lg font-semibold ${
                isDarkMode ? "text-black" : "text-black"
              }`}
            >
              {sponsorData?.phone}
            </Text>
          </View>
        </View>
        <Pressable
          className={`w-full max-w-sm mt-4 mb-5 p-3 rounded-xl items-center mx-auto ${
            isDarkMode ? "bg-white" : "bg-black"
          } `}
          onPress={handlePress}
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
    </>
  );
}
