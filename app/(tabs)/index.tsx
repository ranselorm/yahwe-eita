import { View, Text, ScrollView, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import BalanceCard from "../../components/BalanceCard";
import ReferralList from "../../components/ReferralList";
// import ReferralList from "../components/ReferralList";
import StatsCard from "../../components/StatsCard";
// import TimerCard from "../components/TimerCard";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const name = "Nana";

  return (
    <SafeAreaView
      className={`flex-1 ${isDarkMode ? "bg-black" : "bg-white"} px-6`}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-between items-center mt-4">
          <View className="flex-row items-center gap-x-3">
            <View
              className={`border w-10 h-10 justify-center items-center rounded-full ${
                isDarkMode ? "border-white" : "border-black"
              }`}
            >
              <Text
                className={`text-xl font-semibold ${
                  isDarkMode ? "text-white" : "text-black -mt-1"
                }`}
              >
                {name[0]}
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
                {name && name}
              </Text>
            </View>
          </View>
          <View className="w-10 h-10 rounded-xl border border-gray-400  justify-center items-center">
            <Ionicons
              name="notifications-outline"
              size={24}
              className={`${isDarkMode ? "text-white" : "text-white"}`}
            />
          </View>
        </View>

        {/* Balance Card */}
        <BalanceCard />
        <View className="bg-primary w-full py-3 px-3 rounded-full mt-6 flex-row justify-between items-center">
          <Text className="text-white text-lg font-semibold">
            Create new referral code
          </Text>
          <MaterialCommunityIcons
            name="email-open-outline"
            size={24}
            // color="white"
            className="text-primary bg-white p-1 rounded-full"
          />
        </View>

        {/* Referral List */}
        <ReferralList />
        <View
          className={`${
            isDarkMode ? "bg-white" : "bg-dark-100"
          } w-full p-4 mt-6 flex-row justify-center gap-x-3 items-center `}
          style={{ borderRadius: 50 }}
        >
          <Ionicons name="time-outline" size={24} color="white" />
          <Text
            className={`${
              isDarkMode ? "text-black" : "text-white"
            } text-lg font-semibold`}
          >
            Time left until next level: 6d 23h 40m 3s
          </Text>
        </View>

        {/* Countdown Timer */}
        {/* <TimerCard /> */}

        {/* Stats Card */}
        <StatsCard />
      </ScrollView>
    </SafeAreaView>
  );
}
