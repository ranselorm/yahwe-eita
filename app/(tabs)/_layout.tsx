import { Tabs, Redirect } from "expo-router";

export default function TabsLayout() {
  // const isAuthenticated = false;
  // if (!isAuthenticated) {
  //   return <Redirect href="/landing" />;
  // }

  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="genealogy" options={{ title: "Genealogy" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
