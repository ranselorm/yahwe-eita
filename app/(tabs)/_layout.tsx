import { Tabs, Redirect } from "expo-router";
// import { useAuth } from "../../context/AuthContext";

export default function TabsLayout() {
  // const { isAuthenticated } = useAuth();

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
