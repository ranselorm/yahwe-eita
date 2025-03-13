import { Stack, Redirect } from "expo-router";

export default function AuthLayout() {
  const isAuthenticated = false;

  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Stack>
      {/* <Stack.Screen name="index" options={{ headerShown: false }} /> */}
      <Stack.Screen name="index" options={{ title: "Landing" }} />
      <Stack.Screen name="verify" options={{ title: "Verify" }} />
      <Stack.Screen name="register" options={{ title: "Register" }} />
    </Stack>
  );
}
