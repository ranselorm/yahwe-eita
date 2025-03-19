import { ThemeProvider } from "@/context/ThemeProvider";
import "../global.css";
import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "@/context/userContext";
import Toast from "react-native-toast-message";

const client = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={client}>
      <UserProvider>
        <ThemeProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="settings" />
            <Stack.Screen name="notifications" />
          </Stack>
        </ThemeProvider>
      </UserProvider>
      <Toast />
    </QueryClientProvider>
  );
}
