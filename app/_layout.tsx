import { ThemeProvider } from "@/context/ThemeProvider";
import "../global.css";
import { router, Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider, useUser } from "@/context/userContext";
import Toast from "react-native-toast-message";
import { CountdownProvider } from "@/context/CountdownContext";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { useLogin } from "@/hooks/useLogin";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const client = new QueryClient();

const AppContent = () => {
  const isDarkMode = useColorScheme() === "dark";
  const BG = isDarkMode ? "#000000" : "#FFFFFF";

  const { user, setAccessToken, logout, globalEmail, globalPassword } =
    useUser();
  const loginMutation = useLogin();

  useEffect(() => {
    const checkAuth = async () => {
      const token = user?.token || localStorage.getItem("token");
      if (!token || !user?.isLoggedIn) {
        return router.replace("/(auth)");
      }

      const { exp } = jwtDecode<{ exp: number }>(token);
      if (Date.now() > exp * 1000) {
        if (globalEmail && globalPassword) {
          try {
            const res = await loginMutation.mutateAsync({
              email: globalEmail,
              password: globalPassword,
            });
            // assume res.accessToken is your new token
            const newToken = res.accessToken;
            // 4️⃣ update context + storage
            setAccessToken(newToken);
            localStorage.setItem("token", newToken);
          } catch {
            // 5️⃣ silent login failed → clear and redirect
            logout();
            localStorage.removeItem("token");
            router.replace("/login");
          }
        } else {
          logout();
          localStorage.removeItem("token");
          router.replace("/login");
        }
      }
    };

    checkAuth();
  }, [user, loginMutation, setAccessToken, logout, router]);

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
