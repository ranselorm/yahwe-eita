import { Tabs, Redirect } from "expo-router";
import Octicons from "@expo/vector-icons/Octicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function TabsLayout() {
  const user = useSelector((state: RootState) => state.user.user);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  if (!user?.isLoggedIn) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarInactiveTintColor: isDarkMode ? "black" : "white",
        tabBarActiveTintColor: isDarkMode ? "black" : "white",
        tabBarStyle: {
          // backgroundColor: "red",
          backgroundColor: isDarkMode ? "black" : "white",
          borderColor: "#D3D3D3",
          borderTopWidth: 0.5,
          height: 60,
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <View className="items-center">
              <Octicons
                name="home"
                size={24}
                color={`${isDarkMode ? "white" : "black"}`}
              />
              {focused ? (
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: "orange",
                    marginTop: 4,
                  }}
                />
              ) : (
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: "orange",
                    marginTop: 4,
                    opacity: 0,
                  }}
                />
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="genealogy"
        options={{
          title: "Genealogy",
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <View className="items-center">
              <MaterialCommunityIcons
                name="account-group-outline"
                size={30}
                color={`${isDarkMode ? "white" : "black"}`}
              />
              {focused ? (
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: "orange",
                    marginTop: 4,
                  }}
                />
              ) : (
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: "orange",
                    marginTop: 4,
                    opacity: 0,
                  }}
                />
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: "Transactions",
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <View className="items-center">
              <FontAwesome
                name="exchange"
                size={24}
                color={`${isDarkMode ? "white" : "black"}`}
              />
              {focused ? (
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: "orange",
                    marginTop: 4,
                  }}
                />
              ) : (
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: "orange",
                    marginTop: 4,
                    opacity: 0,
                  }}
                />
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <View className="items-center">
              <MaterialCommunityIcons
                name="account-outline"
                size={30}
                color={`${isDarkMode ? "white" : "black"}`}
              />
              {focused ? (
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: "orange",
                    marginTop: 4,
                  }}
                />
              ) : (
                <View
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: "orange",
                    marginTop: 4,
                    opacity: 0,
                  }}
                />
              )}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
