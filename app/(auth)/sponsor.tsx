import React, { useState } from "react";
import { View, TextInput, Text, useColorScheme, Pressable } from "react-native";
import { useSponsor } from "@/hooks/useSponsor";
import Toast from "react-native-toast-message";
import { router } from "expo-router";

export default function SponsorScreen() {
  const [phone, setPhone] = useState("");
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const {
    data: sponsor,
    isError,
    isLoading,
    refetch,
  } = useSponsor(phone, { queryKey: ["sponsor", phone], enabled: false }); // Manual control

  const handlePress = async () => {
    if (!phone.trim()) {
      Toast.show({ type: "error", text1: "Phone number required" });
      return;
    }

    const result = await refetch();

    if (result.isError) {
      Toast.show({ type: "error", text1: "Error fetching sponsor" });
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
        type: "info",
        text1: "No sponsor found",
        text2: "Please check the phone number",
      });
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        placeholder="Enter phone number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Pressable
        className={`mt-4 p-3 rounded-xl items-center ${
          isDarkMode ? "bg-white" : "bg-black"
        }`}
        onPress={handlePress}
      >
        <Text
          className={`text-lg font-semibold ${
            isDarkMode ? "text-black" : "text-white"
          }`}
        >
          VERIFY SPONSOR
        </Text>
      </Pressable>

      {isLoading && <Text>Loading...</Text>}
      {isError && <Text>Error fetching sponsor</Text>}
      <Toast />
    </View>
  );
}
