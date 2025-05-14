import "../global.css";
import React from "react";
import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
import * as SplashScreen from "expo-splash-screen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { KeyboardProvider } from "react-native-keyboard-controller";
import Toast from "react-native-toast-message";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { store } from "@/store/store";
import { useColorScheme } from "react-native";

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

// AppContent
function AppContent() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  SplashScreen.hideAsync();

  return (
    <>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="test" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="notifications" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      {/* <PersistGate persistor={persistor}> */}
      <QueryClientProvider client={queryClient}>
        {/* <KeyboardProvider> */}
        <AppContent />
        {/* </KeyboardProvider> */}
      </QueryClientProvider>
      <Toast />
      {/* </PersistGate> */}
    </Provider>
  );
}
