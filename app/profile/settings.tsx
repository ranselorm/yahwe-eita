import { View, Text, Pressable, useColorScheme } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

function SettingsItem({ title, icon }: { title: string; icon: string }) {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <Pressable className="flex-row items-center justify-between py-3">
      <View className="flex-row items-center">
        <MaterialIcons
          name={icon}
          size={24}
          color={isDarkMode ? "white" : "black"}
        />
        <Text
          className={`text-lg ml-4 ${isDarkMode ? "text-white" : "text-black"}`}
        >
          {title}
        </Text>
      </View>
      <MaterialIcons
        name="chevron-right"
        size={24}
        color={isDarkMode ? "white" : "black"}
      />
    </Pressable>
  );
}

export default function SettingsScreen() {
  const router = useRouter();
  const isDarkMode = useColorScheme() === "dark";

  return (
    <View
      className={`flex-1 px-6 py-4 ${isDarkMode ? "bg-black" : "bg-white"}`}
    >
      {/* Back Button & Title */}
      {/* <View className="flex-row items-center mt-6">
        <Pressable onPress={() => router.back()}>
          <MaterialIcons
            name="arrow-back"
            size={24}
            color={isDarkMode ? "white" : "black"}
          />
        </Pressable>
        <Text
          className={`text-xl font-semibold ml-4 ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          Settings
        </Text>
      </View> */}

      {/* Settings List */}
      <View className="flex-1 justify-between">
        <View className="mt-6">
          <SettingsItem title="My Account" icon="person-outline" />
          <SettingsItem title="Security" icon="lock-outline" />
          <SettingsItem title="Preferences" icon="tune" />
        </View>
        <View className="mt-6">
          <SettingsItem title="Help & FAQ" icon="help-outline" />
          <SettingsItem title="Terms Of Use" icon="article" />
        </View>
      </View>

      {/* Logout Button */}
      <Pressable
        className="flex-row items-center mt-10 mx-auto"
        onPress={() => alert("Logging Out")}
      >
        <MaterialIcons name="logout" size={24} color="red" />
        <Text className="text-red-500 text-lg font-semibold ml-4">Logout</Text>
      </Pressable>
    </View>
  );
}
