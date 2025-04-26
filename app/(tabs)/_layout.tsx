import { Tabs, Redirect } from "expo-router";
import Octicons from "@expo/vector-icons/Octicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useUser } from "@/context/userContext";

export default function TabsLayout() {
  const { user } = useUser();
  console.log(user, "in tabs");

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarInactiveTintColor: "#000",
        tabBarActiveTintColor: "#000",
        tabBarStyle: {
          backgroundColor: "white",
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
              <Octicons name="home" size={24} color="black" />
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
                color="black"
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
              <FontAwesome name="exchange" size={24} color="black" />
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
                color="black"
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
