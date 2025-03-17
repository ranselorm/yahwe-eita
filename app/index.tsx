import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { getUserData } from "@/utils";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@/context/userContext";

const SplashScreen = () => {
  const [loading, setLoading] = useState(true);
  const { setUser } = useUser();

  useEffect(() => {
    const checkUser = async () => {
      const user = await getUserData();
      if (user) {
        setUser(user);
        router.replace("/(tabs)"); // Navigate if user exists
      } else {
        router.replace("/(auth)"); // Otherwise, go to login
        setUser(null);
      }
      setLoading(false);
    };

    checkUser();
  }, []);

  if (loading) {
    return (
      <SafeAreaView className={"flex-1 bg-white justify-center items-center"}>
        <ActivityIndicator size="large" />;
      </SafeAreaView>
    );
  }

  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
};

export default SplashScreen;
