import {
  View,
  ScrollView,
  useColorScheme,
  Text,
  Image,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ReferralList from "@/components/ReferralList";
import Header from "@/components/Header";
import { useProfile } from "@/hooks/useProfile";
import { MaterialIcons } from "@expo/vector-icons";
import { clearUserData } from "@/utils";
import { router } from "expo-router";
import ProgressBar from "@/components/ProgressBar";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { logout } from "@/store/userSlice";
import AirtimePlaceholder from "@/components/placeholders/AirtimePlaceholder";
import CashPlaceholder from "@/components/placeholders/CashPlaceholder";

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const { data, isLoading } = useProfile();
  const { user } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    clearUserData();
    router.replace("/(auth)");
  };

  return (
    <>
      <SafeAreaView
        className={`flex-1 ${isDarkMode ? "bg-black" : "bg-white"}`}
      >
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
                {user?.email}
              </Text>
              <View className="flex-row justify-between items-center my-2 px-6 gap-x-6">
                <ProgressBar level={data?.level} progress={data?.level} />
                <Text className="text-sm font-semibold mt-2">
                  Level {data?.level}
                </Text>
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
                Number of downlines: {data?.totalRecruits}
              </Text>
            </View>

            <View className="my-8">
              {/* <ReferralCard /> */}
              {isLoading ? (
                <CashPlaceholder />
              ) : (
                <ReferralList recruits={data?.userInfo?.recruits} />
              )}
            </View>
            {isLoading ? (
              <AirtimePlaceholder />
            ) : (
              <View
                className={`p-4 mt-20 rounded-full flex-row justify-between ${
                  isDarkMode ? "bg-gray-900" : "bg-gray-100"
                }`}
              >
                <Text
                  className={`text-base ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  Self Reward Airtime
                </Text>
                <Text
                  className={`text-2xl font-bold ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  {data?.balance} GHS
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
        <Pressable
          className="flex-row items-center mt-10 mb-20  mx-auto"
          onPress={handleLogout}
        >
          <MaterialIcons name="logout" size={24} color="red" />
          <Text className="text-red-500 text-lg font-semibold ml-4">
            Logout
          </Text>
        </Pressable>
      </SafeAreaView>
    </>
  );
}
