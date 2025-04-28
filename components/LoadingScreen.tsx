import { ActivityIndicator, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const LoadingScreen = () => {
  return (
    <SafeAreaView
      className={`flex-1 items-center p-6 ${isDark ? "bg-black" : "bg-white"}`}
    >
      <Text>LoadingScreen</Text>
    </SafeAreaView>
  );
};

export default LoadingScreen;
