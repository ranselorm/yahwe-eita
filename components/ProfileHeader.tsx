import {
  View,
  Text,
  Pressable,
  useColorScheme,
  TouchableOpacity,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";

export default function ProfileHeader() {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <View className={`flex-1 ${isDarkMode ? "bg-black" : "bg-white"} mt-4`}>
      {/* Profile Picture */}
      <View className="flex-row justify-between items-center">
        <TouchableOpacity
          onPress={() => router.push("/profile/settings")}
          activeOpacity={1.2}
        >
          <View className="w-10 h-10 rounded-xl border border-gray-400  justify-center items-center">
            <AntDesign
              name="setting"
              size={20}
              color={isDarkMode ? "white" : "black"}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/profile/notifications")}
          activeOpacity={1.2}
        >
          <View className="w-10 h-10 rounded-xl border border-gray-400  justify-center items-center">
            <Ionicons
              name="notifications-outline"
              size={20}
              color={isDarkMode ? "white" : "black"}
            />
          </View>
        </TouchableOpacity>
      </View>

      {/* Settings Button */}
    </View>
  );
}
