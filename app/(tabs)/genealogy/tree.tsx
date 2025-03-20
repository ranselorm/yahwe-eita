import {
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const genealogyData = [
  {
    id: "user_1",
    name: "John Doe",
    phone: "0557587124",
    recruits: [
      {
        id: "user_2",
        name: "Jane Smith",
        phone: "0550013021",
        recruits: [],
      },
      {
        id: "user_3",
        name: "Alice Green",
        phone: "0557587135",
        recruits: [],
      },
      {
        id: "user_3",
        name: "Jeery Fresh",
        phone: "0557587135",
        recruits: [],
      },
    ],
  },
];

export default function Tree() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "light";

  const UserNode = ({ user }: { user: any }) => {
    console.log(user?.recruits, "NODE");
    return (
      <View className="items-center relative">
        {/* Parent Node */}
        <View className="items-center bg-white shadow-md p-2 rounded-lg w-16 h-16 text-center border relative z-10">
          {/* <Icon icon={"tabler:user"} /> */}
          <Text className="text-[7px] font-medium mt-1">{user.name}</Text>
        </View>

        {/* Recruits */}
        {user?.recruits && user?.recruits.length > 0 && (
          <View className="relative mt-3">
            <View className="relative justify-center items-center flex-row">
              {user?.recruits.length > 1 && (
                <View className="absolute top-[-4px] left-0 right-0 h-0.5 bg-gray-300"></View>
              )}
              {/* Flex Row for Recruits */}
              <View className="flex flex-row justify-center items-center space-x-6">
                {user?.recruits.map((invitee: any, index: number) => (
                  <View key={index} className="items-center relative">
                    {user?.recruits.length > 1 && (
                      <View className="w-0.5 bg-gray-400 h-4 mb-1"></View>
                    )}
                    {/* Recursively Render Recruits */}
                    <UserNode user={invitee} />
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView
      className={`flex-1 px-6 ${isDarkMode ? "bg-black" : "bg-white"}`}
    >
      <View className="mt-4 flex-row justify-between items-center">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="arrow-back-outline"
            size={24}
            color={`${isDarkMode ? "white" : "black"}`}
          />
        </TouchableOpacity>
        <Text
          className={`text-2xl font-semibold ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          Genealogy
        </Text>
        <Text className="opacity-0">Tree</Text>
      </View>
      <ScrollView
        className={`flex-1 px-6 ${isDarkMode ? "bg-black" : "bg-white"}`}
      >
        {genealogyData.map((parent: any) => (
          <UserNode key={parent.id} user={parent} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
