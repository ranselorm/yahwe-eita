import {
  View,
  Text,
  ScrollView,
  useColorScheme,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useGenealogy } from "@/hooks/useGenealogy";

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
        id: "user_4",
        name: "Jeery Fresh",
        phone: "0557587135",
        recruits: [],
      },
    ],
  },
];

const UserNode = ({ user }: { user: any }) => {
  return (
    <View className="items-center justify-center relative min-w-[70px]">
      <View className="items-center justify-center bg-white shadow p-2 rounded-lg w-14 h-14 text-center border border-gray-300 z-10">
        <Ionicons name="person-outline" size={18} color="black" />
      </View>

      {user?.recruits?.length > 0 && (
        <View className="items-center justify-center mt-2">
          <View className="w-0.5 h-4 bg-gray-300" />
          <View className="flex-row items-start mt-1 space-x-4 relative">
            <View className="absolute top-0 left-0 right-0 h-0.5 bg-gray-300" />
            {user.recruits.map((child: any) => (
              <View key={child.id} className="items-center relative">
                <View className="w-0.5 h-4 bg-gray-400 mb-1" />
                <UserNode user={child} />
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default function Tree() {
  const isDark = useColorScheme() === "dark";
  const { data, isLoading } = useGenealogy();
  console.log(data, "data from useGenealogy");

  return (
    <SafeAreaView className={`${isDark ? "bg-black" : "bg-white"} flex-1`}>
      <View className="mt-4 flex-row justify-between items-center px-6 mb-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="arrow-back-outline"
            size={24}
            color={isDark ? "white" : "black"}
          />
        </TouchableOpacity>
        <Text
          className={`text-2xl font-semibold ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          Genealogy
        </Text>
        <Text className="opacity-0">Tree</Text>
      </View>

      {isLoading ? (
        <ActivityIndicator />
      ) : data?.recruits?.length === 0 ? (
        <View className="flex-1 items-center justify-center px-4">
          <Ionicons name="git-branch-outline" size={60} color="#9CA3AF" />
          <Text className="text-center mt-3 text-lg text-gray-500">
            No genealogy data yet.
          </Text>
          <Text className="text-center text-gray-400 text-sm">
            You haven’t invited anyone yet.
          </Text>
        </View>
      ) : (
        <ScrollView horizontal className="flex-1">
          <ScrollView
            contentContainerStyle={{ minWidth: "100%", alignItems: "center" }}
            showsVerticalScrollIndicator={false}
          >
            <View className="items-center w-full">
              <View className="items-center justify-center min-w-[400px]">
                {data?.recruits?.map((user: any) => (
                  <UserNode key={user.id} user={user} />
                ))}
              </View>
            </View>
          </ScrollView>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
