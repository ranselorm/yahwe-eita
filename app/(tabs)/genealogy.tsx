import { View, Text, Pressable, FlatList, useColorScheme } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
// import ReferralCard from "../../components/ReferralCard";

function ReferralCard() {
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
        <Text className="bg-accent text-white px-3 py-1 rounded-full text-xs">
          Active
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
            Seth Agyemang
          </Text>
          <MaterialCommunityIcons
            name="account-check-outline"
            size={20}
            color={`${isDarkMode ? "white" : "black"}`}
          />
        </View>
        <Text className="text-black mb-4 font-semibold">Invited: 3</Text>

        {/* Progress Bar */}
        <ProgressBar progress={60} level={6} />
      </View>
    </View>
  );
}

export default function GenealogyScreen() {
  const isDarkMode = useColorScheme() === "dark";

  const referrals = [
    { id: "1", name: "Janelle Addae", status: "Active", invited: 1, level: 4 },
    { id: "2", name: "Seth Agyemang", status: "Active", invited: 3, level: 6 },
    { id: "3", name: "Andrew Peters", status: "Pending", invited: 0, level: 6 },
  ];

  return (
    <View className={`flex-1 px-4 ${isDarkMode ? "bg-black" : "bg-white"}`}>
      {/* Header with "View Tree" Button */}
      <View className="items-center mt-6">
        <Text
          className={`text-xl font-semibold ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          Genealogy
        </Text>
        <Pressable className="mt-2 px-4 py-2 rounded-lg bg-gray-200">
          <Text className="text-black font-semibold">VIEW TREE</Text>
        </Pressable>
      </View>

      {/* Referrals List */}
      <FlatList
        data={referrals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ReferralCard
            name={item.name}
            status={item.status}
            invited={item.invited}
            level={item.level}
          />
        )}
        className="mt-6"
      />

      {/* Invite More Button */}
      <View className="absolute bottom-6 left-1/2 -translate-x-1/2 items-center">
        <Pressable className="w-12 h-12 bg-black rounded-full items-center justify-center">
          <MaterialIcons name="add" size={24} color="white" />
        </Pressable>
        <Text className="text-gray-500 mt-2">Invite More Referrals</Text>
      </View>
    </View>
  );
}
