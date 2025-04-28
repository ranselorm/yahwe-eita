import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { getUserData } from "@/utils";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@/context/userContext";
import LoadingScreen from "@/components/LoadingScreen";

const SplashScreen = () => {
  const [loading, setLoading] = useState(true);
  const { setUser } = useUser();

  useEffect(() => {
    const checkUser = async () => {
      const user = await getUserData();
      if (user) {
        setUser(user);
        router.replace("/(tabs)");
      } else {
        router.replace("/(auth)");
        setUser(null);
      }
      setLoading(false);
    };

    checkUser();
  }, []);

  if (!loading) {
    return <LoadingScreen />;
  }

  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
};

export default SplashScreen;
