import { Stack, Redirect } from "expo-router";

export default function TreeLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="index" options={{ headerShown: false }} /> */}
      <Stack.Screen name="index" />
      <Stack.Screen name="tree" />
    </Stack>
  );
}
