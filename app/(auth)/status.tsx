import {
  View,
  Text,
  Pressable,
  ScrollView,
  useColorScheme,
  Image,
} from "react-native";
import { useState } from "react";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

export default function WelcomeScreen() {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <SafeAreaView
      className={`flex-1 ${
        isDarkMode ? "bg-black" : "bg-white"
      } p-6 items-center justify-center h-full`}
    ></SafeAreaView>
  );
}
