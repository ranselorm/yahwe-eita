import { Stack, Redirect } from "expo-router";

export default function AuthLayout() {
  // const { isAuthenticated } = useAuth();

  // if (isAuthenticated) {
  //   return <Redirect href="/home" />;
  // }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="landing" options={{ title: "Landing" }} />
      <Stack.Screen name="verify" options={{ title: "Verify" }} />
      <Stack.Screen name="register" options={{ title: "Register" }} />
    </Stack>
  );
}
