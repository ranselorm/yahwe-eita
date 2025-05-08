import { Alert } from "react-native";
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
import { saveUserData, saveUserToken } from "@/utils";
import { Provider } from "react-redux";
import { store } from "@/store/store";

const client = new QueryClient();

const AppContent = () => {
  const isDarkMode = useColorScheme() === "dark";
  const BG = isDarkMode ? "#000000" : "#FFFFFF";

  const { user, setAccessToken, logout, globalEmail, globalPassword, setUser } =
    useUser();

  console.log({ globalEmail, globalPassword });
  const loginMutation = useLogin();

  // const updateUserSession = async (responseData: any) => {
  //   try {
  //     const decodedToken: any = jwtDecode(responseData?.data?.id_token);
  //     console.log(decodedToken, "DECODED TOKEN");
  //     const updatedUser = {
  //       isLoggedIn: true,
  //       name: decodedToken.name,
  //       id: decodedToken.sub,
  //       email: decodedToken.email,
  //       picture: decodedToken.picture,
  //       exp: decodedToken.exp,
  //       token: responseData?.data?.access_token,
  //     };
  //     await saveUserData(updatedUser);
  //     await saveUserToken(responseData?.data?.id_token);
  //     setUser(updatedUser);
  //   } catch (error) {
  //     console.error("Error updating session:", error);
  //     Alert.alert("Error", "Failed to update user session.");
  //   }
  // };

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const token = user?.token || localStorage.getItem("token");
  //     if (!token || !user?.isLoggedIn) {
  //       return router.replace("/(auth)");
  //     }

  //     const { exp } = jwtDecode<{ exp: number }>(token);
  //     if (Date.now() > exp * 1000) {
  //       if (globalEmail && globalPassword) {
  //         try {
  //           const res = await loginMutation.mutateAsync({
  //             email: globalEmail,
  //             password: globalPassword,
  //           });
  //         } catch {
  //           // 5️⃣ silent login failed → clear and redirect
  //           logout();
  //           localStorage.removeItem("token");
  //           router.replace("/login");
  //         }
  //       } else {
  //         logout();
  //         localStorage.removeItem("token");
  //         router.replace("/login");
  //       }
  //     }
  //   };

  //   checkAuth();
  // }, [user, loginMutation, logout, router]);

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
    </Provider>
  );
}
