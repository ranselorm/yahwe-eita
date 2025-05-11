import {
  ActivityIndicator,
  Text,
  View,
  useColorScheme,
  Image,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const LoadingScreen = () => {
  const theme = useSelector((s: RootState) => s.theme.theme);
  const isDarkMode = theme === "dark";
  return (
    <SafeAreaView
      className={`flex-1 items-center p-6 ${
        isDarkMode ? "bg-black" : "bg-white"
      }`}
    >
      <View className="items-center justify-center flex-1">
        <View className="items-center flex-row">
          <View className="w-2 h-2">
            <Image
              source={require("@/assets/images/logo.png")}
              className="w-full h-full"
            />
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
        <Text className="text-sm">Powered By</Text>
        <Image
          source={require("@/assets/images/berth.png")}
          className="w-32 h-16"
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
    // <SafeAreaView
    //   className={`flex-1 items-center justify-center p-6 bg-yellow-500 `}
    // >
    //   <ActivityIndicator size={"large"} />
    // </SafeAreaView>
  );
};

export default LoadingScreen;
