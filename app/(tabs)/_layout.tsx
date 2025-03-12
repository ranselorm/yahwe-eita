import { Tabs, Redirect } from "expo-router";
// import { useAuth } from "../../context/AuthContext";

export default function TabsLayout() {
  // const { isAuthenticated } = useAuth();

  // if (!isAuthenticated) {
  //   return <Redirect href="/landing" />;
  // }

  return (
    <Tabs>
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="genealogy/tree" options={{ title: "Genealogy" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
