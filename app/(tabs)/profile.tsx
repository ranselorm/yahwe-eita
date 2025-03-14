import { View, ScrollView, useColorScheme, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../../components/ProfileHeader";
import ReferralCard from "../../components/ReferralCard";
// import BalanceCard from "../components/BalanceCard";

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  return (
    <SafeAreaView className={`flex-1 ${isDarkMode ? "bg-black" : "bg-white"}`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-6">
          <ProfileHeader />
        </View>
        <View className="w-full h-[1px] bg-grey my-4" />

        {/* Active Invites & Sorting */}
        <View className="px-6">
          <View className="flex-row justify-between items-center mt-4">
            <Text
              className={`text-lg font-semibold ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              Active Invites: 6
            </Text>
            <View className="border border-gray-400 px-3 py-1 rounded-full">
              <Text className="text-gray-500 ">Sort By ▼</Text>
            </View>
          </View>
          <View className="my-4">
            <Text className="text-center font-semibold text-xl">
              Top Referral
            </Text>
            <ReferralCard />
          </View>
        </View>

        {/* Referral Section */}

        {/* Available Balance */}
        {/* <BalanceCard /> */}
      </ScrollView>
    </SafeAreaView>
  );
}
