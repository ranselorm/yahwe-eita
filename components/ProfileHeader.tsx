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

export default function ProfileHeader() {
  const isDarkMode = useColorScheme() === "dark";
  const name = "Nana Kwame";

  return (
    <View className={`flex-1 ${isDarkMode ? "bg-black" : "bg-white"} mt-4`}>
      {/* Profile Picture */}
      <View className="flex-row justify-between items-center">
        <TouchableOpacity
          onPress={() => Alert.alert("Settings")}
          activeOpacity={1.5}
        >
          <View className="w-10 h-10 rounded-xl border border-gray-400  justify-center items-center">
            <AntDesign
              name="setting"
              size={20}
              color={isDarkMode ? "white" : "black"}
            />
          </View>
        </TouchableOpacity>
        <View className="w-10 h-10 rounded-xl border border-gray-400  justify-center items-center">
          <Ionicons
            name="notifications-outline"
            size={20}
            color={isDarkMode ? "white" : "black"}
          />
        </View>
      </View>
      <View className="items-center -mt-6">
        <View className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center">
          <Text className="text-xl font-semibold">N</Text>
        </View>

        {/* User Info */}
        <Text
          className={`text-xl font-semibold mt-2 ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          Nana Kwame
        </Text>
        <Text
          className={`text-sm font-semibold ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          testemail@email.com • +233 123 456 7890
        </Text>
        <View className="flex-row justify-between items-center my-2 gap-x-6">
          <View className="h-2 w-[50%] bg-gray-300 mt-2 rounded-full overflow-hidden">
            <View className="h-full w-2/4 bg-orange-500" />
          </View>

          <Text className="text-sm font-semibold mt-2">Level 4</Text>
        </View>
      </View>

      {/* Settings Button */}
    </View>
  );
}
