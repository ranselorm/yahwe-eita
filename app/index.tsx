import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { getUserData } from "@/utils";

const SplashScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const user = await getUserData();
      if (user) {
        router.replace("/(tabs)"); // Navigate if user exists
      } else {
        router.replace("/(auth)"); // Otherwise, go to login
      }
      setLoading(false);
    };

    checkUser();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
};

export default SplashScreen;
