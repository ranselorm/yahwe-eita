import { Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { persistor, store } from "@/store/store";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";

const client = new QueryClient();

const AppContent = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const isDarkMode = theme === "dark";
  const BG = isDarkMode ? "#000000" : "#FFFFFF";

  return (
    <>
      <StatusBar
        style={isDarkMode ? "light" : "dark"}
        backgroundColor={BG}
        translucent={false}
      />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="notifications" />
      </Stack>
    </>
  );
};

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={client}>
          <KeyboardProvider>
            <AppContent />
          </KeyboardProvider>
        </QueryClientProvider>
      </PersistGate>
      <Toast />
    </Provider>
  );
}
