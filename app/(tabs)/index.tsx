import {
  View,
  Text,
  ScrollView,
  useColorScheme,
  Modal,
  TextInput,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import BalanceCard from "../../components/BalanceCard";
import ReferralList from "../../components/ReferralList";

import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { useInvite } from "@/hooks/useInvite";
import Countdown from "@/components/Countdown";
import { useHome } from "@/hooks/useHome";
const referrals = [
  { name: "Janelle Addae", verified: true },
  { name: "Seth Agyemang", verified: true },
  { name: "Andrews Peter", verified: false },
];

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  //hooks
  const inviteMutation = useInvite();
  const { data: homeData } = useHome();

  const handleInvite = () => {
    if (!name || !phone) {
      Alert.alert("Required", "Please fill in all fields.");
      return;
    }

    inviteMutation.mutate(
      { name, phone },
      {
        onSuccess: () => {
          Toast.show({
            type: "success",
            text1: "Invitation sent",
            text2: "Success",
            position: "top",
          });
          console.log("Sending sucessful");
          setTimeout(() => setModalVisible(false), 500);
        },
        onError: (error) => {
          console.error("Error sending invite:", error);
          Toast.show({
            type: "error",
            text1: "Error sending invite",
            text2: "An error occurred. Please try again.",
            position: "top",
          });
        },
      }
    );
  };

  return (
    <SafeAreaView
      className={`flex-1 ${isDarkMode ? "bg-black" : "bg-white"} px-6`}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />

        {/* Countdown */}
        <View
          className={`${
            isDarkMode ? "bg-white" : "bg-dark-100"
          } w-full p-4 mt-6 rounded-xl`}
        >
          <View className="flex-row justify-center gap-x-2 items-center">
            <Ionicons name="time-outline" size={24} color="white" />
            <Text
              className={`${
                isDarkMode ? "text-black" : "text-white"
              } text-lg font-semibold`}
            >
              Time left until next level:{" "}
              <Countdown createdAt={homeData?.userInfo?.createdAt} />
            </Text>
          </View>
          <View className="flex-row items-center justify-between mt-4 px-4">
            <ProgressBar level={homeData?.level} progress={0} />
            <Text className="text-white">Level: {homeData?.level}</Text>
          </View>
        </View>
        {/* Balance Card */}
        <View
          className={`p-4 rounded-xl mt-8 ${
            isDarkMode ? "bg-dark-100" : "bg-gray-100"
          }`}
        >
          <Text
            className={`text-base mb-3 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            Available Airtime:
          </Text>
          <Text
            className={`text-3xl font-bold ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            GHS {homeData?.balance}
          </Text>

          {/* Action Buttons */}
          <View className="flex-row justify-between mt-6">
            {[
              { label: "Topup", icon: "add" },
              { label: "Withdraw", icon: "arrow-downward" },
              { label: "History", icon: "history" },
              { label: "Details", icon: "info" },
            ].map((item, index) => (
              <View key={index} className="items-center">
                <Pressable
                  className={`w-12 h-12 rounded-full items-center justify-center ${
                    item.label === "Topup" ? "bg-primary" : "bg-white"
                  }`}
                >
                  {item.label !== "Details" ? (
                    <MaterialIcons
                      name={item.icon}
                      size={24}
                      color={`${item.label === "Topup" ? "white" : "black"}`}
                    />
                  ) : (
                    <Ionicons name="menu-outline" size={24} color="black" />
                  )}
                </Pressable>
                <Text className="text-sm mt-1 text-gray-500">{item.label}</Text>
              </View>
            ))}
          </View>
        </View>
        <Pressable onPress={() => setModalVisible(true)}>
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
        </Pressable>

        {/* Stats Card */}
        <View className="flex-row justify-between w-full mt-6 gap-x-2">
          <View className="bg-accent p-6 w-[47%] rounded-xl">
            <Text className="text-white">Earnings this week</Text>
            <View className="flex-row items-center justify-between mt-5">
              <FontAwesome name="money" size={24} color="white" />
              <Text className="text-white text-xl font-semibold">
                GHS{homeData?.earnedThisWeek}
              </Text>
            </View>
          </View>
          <View className="bg-gray-100 p-6 w-[47%] rounded-xl">
            <Text className="text-black">Recruits this week</Text>
            <View className="flex-row items-center justify-between mt-5">
              <MaterialCommunityIcons
                name="account-check-outline"
                size={24}
                color="black"
              />
              <Text className="text-black text-xl font-semibold">
                {homeData?.newRecruitsThisWeek} recruits
              </Text>
            </View>
          </View>
        </View>

        {/* Recruits */}
        <View className="mt-6">
          <View className="flex-row justify-between mb-4">
            <Text
              className={`font-semibold text-lg ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              My Recruits
            </Text>
          </View>

          {/* Referral List */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-2 w-full flex-1"
          >
            <View className="flex-row gap-x-3 justify-center items-center w-full ">
              {homeData?.recruits?.length > 0 ? (
                homeData?.recruits?.map((item: any) => (
                  <View
                    key={item?.id}
                    className={`w-[116px] h-24 rounded-lg items-center justify-center  ${
                      isDarkMode ? "bg-dark-100" : "bg-gray-200"
                    }`}
                  >
                    <View className="absolute top-1 right-2">
                      {item?.verified === true ? (
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
                    <View
                      className={`${
                        item.verified === true
                          ? "border-green-500"
                          : "border-gray-300"
                      } bg-white  h-8 w-8 rounded-full items-center justify-center border-2`}
                    >
                      <Text>{item.name[0]}</Text>
                    </View>
                    <Text
                      className={`${
                        isDarkMode ? "text-white" : "text-black"
                      } mt-2`}
                    >
                      {item.name}
                    </Text>
                  </View>
                ))
              ) : (
                <View className="flex-1 items-center justify-center h-full w-full max-w-xl">
                  <Text>No recruits</Text>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
        {/* <ReferralList /> */}
      </ScrollView>
      <Modal visible={isModalVisible} transparent animationType="slide">
        <View className="flex-1 justify-center items-center bg-black/60">
          <View className="bg-white p-6 rounded-lg w-80">
            <Text className="text-lg font-semibold mb-4 text-black">
              Enter name and phone number
            </Text>

            <TextInput
              value={name}
              onChangeText={setName}
              className="border border-gray-300 rounded-md p-3 text-center text-lg mb-4"
            />
            <TextInput
              value={phone}
              onChangeText={setPhone}
              // placeholder="0234567891"
              keyboardType="number-pad"
              maxLength={10}
              className="border border-gray-300 rounded-md p-3 text-center text-lg mb-4"
            />

            <Pressable
              className="bg-black p-3 rounded-md items-center"
              onPress={handleInvite}
            >
              <Text className="text-white text-lg font-semibold">
                {inviteMutation.isPending ? (
                  <ActivityIndicator size={"small"} />
                ) : (
                  "Submit"
                )}
              </Text>
            </Pressable>

            <Pressable
              className="mt-4 items-center"
              onPress={() => setModalVisible(false)}
            >
              <Text className="text-gray-600 text-sm">Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
