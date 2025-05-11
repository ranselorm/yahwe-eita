import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useUser } from "@/context/userContext";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

interface HeaderProps {
  isProfileScreen?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isProfileScreen }) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <>
      <View className="flex-row justify-between items-center mt-4">
        {!isProfileScreen ? (
          <View className="flex-row items-center gap-x-3">
            <View
              className={`border w-10 h-10 justify-center items-center rounded-full ${
                isDarkMode ? "border-white" : "border-black"
              }`}
            >
              <Text
                className={`text-xl font-semibold ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                {user?.name[0]}
              </Text>
            </View>
            <View>
              <Text
                className={`text-xl font-semibold ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                {getGreeting()}
              </Text>
              <Text
                className={`text-xl font-semibold ${
                  isDarkMode ? "text-white" : "text-black -mt-1"
                }`}
              >
                {user?.name}
              </Text>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => router.push("/settings")}
            className="opacity-0"
          >
            <View
              className={`w-10 h-10 rounded-xl border border-gray-400  justify-center items-center`}
            >
              <AntDesign
                name="setting"
                size={20}
                color={isDarkMode ? "dark" : "white"}
              />
            </View>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => router.push("/notifications")}
          className="opacity-0"
        >
          <View className="w-10 h-10 rounded-xl border border-gray-400  justify-center items-center">
            <Ionicons
              name="notifications-outline"
              size={20}
              className={`${isDarkMode ? "text-white" : "text-white"}`}
            />
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({});
