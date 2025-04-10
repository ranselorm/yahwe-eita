import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider, useUser } from "@/context/userContext";
import { ThemeProvider } from "@/context/ThemeProvider";
import { CountdownProvider } from "@/context/CountdownContext";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import * as SplashScreen from "expo-splash-screen";
import { getUserData } from "@/utils";

const client = new QueryClient();

const AppContent = () => {
  const [loading, setLoading] = useState(true);
  const { setUser } = useUser();
  SplashScreen.preventAutoHideAsync();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const user = await getUserData();
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
      } catch (e) {
        console.warn("Error checking user state:", e);
      } finally {
        setLoading(false);
        SplashScreen.hideAsync();
      }
    };

    initializeApp();
  }, []);

  if (loading) {
    return null;
  }
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="notifications" />
    </Stack>
  );
};

function RootLayoutWithSplash() {
  return (
    <QueryClientProvider client={client}>
      <UserProvider>
        <CountdownProvider>
          <ThemeProvider>
            <KeyboardProvider>
              <AppContent />
            </KeyboardProvider>
          </ThemeProvider>
        </CountdownProvider>
      </UserProvider>
      <Toast />
    </QueryClientProvider>
  );
}

export default RootLayoutWithSplash;
