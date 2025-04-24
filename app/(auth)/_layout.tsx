import { Stack, Redirect } from "expo-router";

export default function AuthLayout() {
  // const isAuthenticated = true; // fetch user dynamically later

  // if (isAuthenticated) {
  //   return <Redirect href="/(tabs)" />;
  // }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="index" options={{ headerShown: false }} /> */}
      <Stack.Screen name="index" />
      <Stack.Screen name="landing" />
      <Stack.Screen name="sponsor" />
      <Stack.Screen name="confirmation" />
      <Stack.Screen name="verify" />
      <Stack.Screen name="register" />
      <Stack.Screen name="status" />
      <Stack.Screen name="login" />
      <Stack.Screen name="reset-password" />
    </Stack>
  );
}
