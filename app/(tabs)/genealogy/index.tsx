import { View, Text, Pressable, FlatList, useColorScheme } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import ProgressBar from "@/components/ProgressBar";
import { router } from "expo-router";
// import ReferralCard from "../../components/ReferralCard";

function ReferralCard({
  name,
  status,
  invited,
  level,
  progress,
}: {
  name: string;
  status: string;
  invited: number;
  level: number;
  progress: number;
}) {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <View
      className={`p-4 mt-4 rounded-xl ${
        isDarkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <View className="flex-row justify-between items-center">
        <Text
          className={`text-sm font-semibold ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          Direct Referral
        </Text>
        <Text
          className={`${
            status === "Active" ? "bg-accent" : "bg-dark-100"
          } text-white px-3 py-1 rounded-full text-xs`}
        >
          {status}
        </Text>
      </View>

      {/* Referral Info */}
      <View className="mt-2">
        <View className="flex-row justify-between items-center my-4">
          <Text
            className={`text-xl font-semibold ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            {name}
          </Text>
          {status === "Active" ? (
            <MaterialCommunityIcons
              name="account-check-outline"
              size={20}
              color={`${isDarkMode ? "white" : "black"}`}
            />
          ) : (
            <MaterialCommunityIcons
              name="account-alert-outline"
              size={20}
              color={`${isDarkMode ? "white" : "black"}`}
            />
          )}
        </View>
        <Text className="text-black mb-4 font-semibold">
          Invited: {invited}
        </Text>

        {/* Progress Bar */}
        <ProgressBar progress={progress} level={level} />
      </View>
    </View>
  );
}

export default function GenealogyScreen() {
  const isDarkMode = useColorScheme() === "dark";

  const referrals = [
    {
      id: "1",
      name: "Janelle Addae",
      status: "Active",
      invited: 1,
      level: 4,
      progress: 40,
    },
    {
      id: "2",
      name: "Seth Agyemang",
      status: "Active",
      invited: 3,
      level: 6,
      progress: 70,
    },
    {
      id: "3",
      name: "Andrew Peters",
      status: "Pending",
      invited: 0,
      level: 6,
      progress: 0,
    },
  ];

  return (
    <View className={`flex-1 px-6 ${isDarkMode ? "bg-black" : "bg-white"}`}>
      <View className="items-center mt-4">
        <Text
          className={`text-2xl font-semibold ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          Genealogy
        </Text>
        <Pressable
          className="mt-2 px-6 py-2 rounded-full bg-transparent border border-black"
          onPress={() => router.push("/(tabs)/genealogy/tree")}
        >
          <Text className="text-black font-semibold text-sm">VIEW TREE</Text>
        </Pressable>
      </View>

      <FlatList
        data={referrals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ReferralCard
            name={item.name}
            status={item.status}
            invited={item.invited}
            level={item.level}
            progress={item.progress}
          />
        )}
        className="mt-6"
      />

      <View className="absolute bottom-6 left-1/2 -translate-x-1/2 items-center">
        <Pressable className="w-12 h-12 bg-black rounded-full items-center justify-center">
          <MaterialIcons name="add" size={24} color="white" />
        </Pressable>
        <Text className="text-black text-semibold text-sm mt-2">
          Invite More Referrals
        </Text>
      </View>
    </View>
  );
}
