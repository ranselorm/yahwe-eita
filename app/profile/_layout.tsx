import React from "react";
import { Redirect, Stack } from "expo-router";

export default function ProfileLayout() {
  //   const isAuthenticated = true; // fetch user dynamically later

  //   if (isAuthenticated) {
  //     return <Redirect href="/(tabs)" />;
  //   }
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="settings" />
      <Stack.Screen name="notifications" />
    </Stack>
  );
}
