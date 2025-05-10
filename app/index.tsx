import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { router } from "expo-router";

const Page = () => {
  useEffect(() => {
    setTimeout(() => {
      router.push("/(auth)/sponsor");
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Text className="font-bold text-4xl">Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Page;
