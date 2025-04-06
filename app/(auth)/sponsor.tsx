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
import Octicons from "@expo/vector-icons/Octicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function SponsorScreen() {
  const [phone, setPhone] = useState("");
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const { isLoading, refetch } = useSponsor(phone, {
    queryKey: ["sponsor", phone],
    enabled: false,
  });

  const handlePress = async () => {
    if (!phone.trim()) {
      Toast.show({ type: "error", text1: "Phone number required" });
      return;
    }

    const result = await refetch();

    if (result.isError) {
      Toast.show({ type: "error", text1: "Sponsor is not found!" });
      return;
    }

    if (result.data) {
      Toast.show({ type: "success", text1: "Sponsor found" });
      setTimeout(() => {
        router.push({
          pathname: "/confirmation",
          params: { sponsor: JSON.stringify(result.data) },
        });
      }, 1000);
    } else {
      Toast.show({
        type: "error",
        text1: "No sponsor found",
        text2: "Please check the phone number",
      });
    }
  };

  return (
    <SafeAreaView
      className={`flex-1 px-6 ${isDarkMode ? "bg-black" : "bg-white"}`}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="black" />{" "}
      </TouchableOpacity>
      <View className="flex-1 justify-center items-center h-full">
        <View className={`flex-1 justify-center items-center w-full`}>
          <Text
            className={`text-2xl font-semibold mb-8 text-center ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            Enter sponsor phone number
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
            } ${isLoading ? "opacity-50" : ""}`}
            onPress={handlePress}
            disabled={isLoading}
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
  );
}
