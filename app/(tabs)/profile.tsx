import { View, ScrollView, useColorScheme, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ReferralCard from "../../components/ReferralCard";
import ReferralList from "@/components/ReferralList";
import Header from "@/components/Header";
import { useUser } from "@/context/userContext";
// import BalanceCard from "../components/BalanceCard";

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const { user } = useUser();

  return (
    <SafeAreaView className={`flex-1 ${isDarkMode ? "bg-black" : "bg-white"}`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-6">
          <Header isProfileScreen />
          <View className="items-center -mt-6">
            <Image
              source={{
                uri: user?.picture || "",
              }}
              style={{ width: 40, height: 40, borderRadius: 50 }}
            />

            <Text
              className={`text-xl font-semibold mt-2 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              {user?.name}
            </Text>
            <Text
              className={`text-sm font-semibold ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              {user?.email} • +233 123 456 7890
            </Text>
            <View className="flex-row justify-between items-center my-2 gap-x-6">
              <View className="h-2 w-[50%] bg-gray-300 mt-2 rounded-full overflow-hidden">
                <View className="h-full w-2/4 bg-orange-500" />
              </View>

              <Text className="text-sm font-semibold mt-2">Level 4</Text>
            </View>
          </View>
          <View className="w-full h-[1px] bg-grey my-4" />
        </View>

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
          <View className="my-8">
            <Text className="text-center font-semibold text-xl">
              Top Referral
            </Text>
            <ReferralCard />
            <ReferralList />
            <View
              className={`p-4 mt-6 rounded-full flex-row justify-between ${
                isDarkMode ? "bg-gray-900" : "bg-gray-100"
              }`}
            >
              <Text
                className={`text-base ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                Available Balance:
              </Text>
              <Text
                className={`text-2xl font-bold ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                GHS 80.00
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
