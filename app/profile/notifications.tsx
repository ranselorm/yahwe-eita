import { View, Text, Pressable, FlatList, useColorScheme } from "react-native";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";

function NotificationItem({
  name,
  message,
}: {
  name: string;
  message: string;
}) {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <Pressable className="flex-row items-center justify-between py-4 border-b border-gray-300">
      <View className="flex-row items-center">
        <AntDesign
          name="adduser"
          size={24}
          color={isDarkMode ? "white" : "black"}
        />
        <Text
          className={`text-lg ml-4 ${isDarkMode ? "text-white" : "text-black"}`}
        >
          <Text className="font-semibold">{name}</Text> {message}
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

export default function NotificationsScreen() {
  const isDarkMode = useColorScheme() === "dark";

  const notifications = [
    { id: "1", name: "Karen", message: "joined with your referral code" },
    { id: "2", name: "Kwesi", message: "joined with your referral code" },
  ];

  return (
    <View className={`flex-1 px-6 ${isDarkMode ? "bg-black" : "bg-white"}`}>
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
          Notifications
        </Text>
      </View> */}

      {/* Notifications List */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NotificationItem name={item.name} message={item.message} />
        )}
        className="mt-6"
      />
    </View>
  );
}
