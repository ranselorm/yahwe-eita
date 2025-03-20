import { Text, useColorScheme, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Tree() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  return (
    <SafeAreaView
      className={`flex-1 px-6 ${isDarkMode ? "bg-black" : "bg-white"}`}
    >
      <View className="mt-4 flex-row justify-between items-center">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="arrow-back-outline"
            size={24}
            color={`${isDarkMode ? "white" : "black"}`}
          />
        </TouchableOpacity>
        <Text
          className={`text-2xl font-semibold ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          Genealogy
        </Text>
        <Text className="opacity-0">Tree</Text>
      </View>
    </SafeAreaView>
  );
}
