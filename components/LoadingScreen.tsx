import { ActivityIndicator, Text, View, useColorScheme } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";

const LoadingScreen = () => {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <SafeAreaView
      className={`flex-1 items-center p-6 ${
        isDarkMode ? "bg-black" : "bg-white"
      }`}
    >
      <View className="items-center justify-center flex-1">
        <View className="items-center flex-row">
          <View className="w-20 h-20">
            <Image source={{ uri: "logo" }} style={{ width: 60, height: 60 }} />
          </View>
          <Text
            className={`text-xl font-bold text-center -ml-6 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            YAHWE-EITA
          </Text>
        </View>
        <ActivityIndicator className="mt-6" size={"large"} />
      </View>
      <View className="flex-row mx-auto items-center">
        <Text className="text-sm dark:text-white">Powered By</Text>
        <Image source={{ uri: isDarkMode ? 'berth_white' : 'berth' }} style={{ width: 100, height: 30 }} />
      </View>
    </SafeAreaView>
  );
};

export default LoadingScreen;
