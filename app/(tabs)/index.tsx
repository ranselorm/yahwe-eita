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
  RefreshControl,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import { FontAwesome } from "@expo/vector-icons";
import { useState, useCallback } from "react";
import Toast from "react-native-toast-message";
import { useInvite } from "@/hooks/useInvite";
import Countdown from "@/components/Countdown";
import { useHome } from "@/hooks/useHome";
import AirtimePlaceholder from "@/components/placeholders/AirtimePlaceholder";
import CashPlaceholder from "@/components/placeholders/CashPlaceholder";
import DownlinesPlaceholder from "@/components/placeholders/DownlinesPlaceholder";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [timeIsUp, setTimeIsUp] = useState(false);

  //hooks
  const inviteMutation = useInvite();
  const { data: homeData, refetch, isLoading, isFetching } = useHome();

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

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const handleTimeUp = () => {
    setTimeIsUp(true);
  };

  return (
    <>
      <SafeAreaView
        className={`flex-1 ${isDarkMode ? "bg-black" : "bg-white"} px-6`}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={"#f97316"}
            />
          }
        >
          <Header />
          {/* Countdown */}
          {
            <View
              className={`${
                isDarkMode ? "bg-white" : "bg-dark-100"
              } w-full p-4 mt-12 mb-10 rounded-xl ${
                timeIsUp && "bg-green-900"
              }`}
            >
              <View className="flex-row gap-x-2 items-center">
                <Ionicons name="time-outline" size={24} color={ isDarkMode ? "black" : "white"} />
                <Text
                  className={`${
                    isDarkMode ? "text-black" : "text-white"
                  } text-lg font-semibold items-center justify-center`}
                >
                  {!timeIsUp ? "Time left until next level" : "Your time is up"}
                  :{" "}
                  {isLoading ? (
                    // <CountdownPlaceholder />
                    <View className="">
                      <ActivityIndicator size={"small"} />
                    </View>
                  ) : (
                    <Countdown
                      createdAt={homeData?.userInfo?.createdAt}
                      onTimeUp={handleTimeUp}
                    />
                  )}
                </Text>
              </View>

              <ProgressBar
                level={homeData?.level}
                progress={homeData?.level}
                onTimeUp={timeIsUp}
              />
            </View>
          }
          {/* Balance Card */}
          {isLoading || isFetching ? (
            <AirtimePlaceholder />
          ) : (
            <View
              className={`p-4 rounded-xl ${
                isDarkMode ? "bg-dark-100" : "bg-gray-100"
              }`}
            >
              <Text
                className={`text-base mb-3 ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                Self Reward Airtime:
              </Text>
              <Text
                className={`text-3xl font-bold ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                <Text>GH₵ {homeData?.balance}</Text>
              </Text>
            </View>
          )}

          {isLoading || isFetching ? (
            <CashPlaceholder />
          ) : (
            <View className="flex-row justify-between w-full mt-12 gap-x-2">
              <View className="bg-green-900 p-6 w-[47%] rounded-xl">
                <Text className="text-white">Cash Earnings</Text>
                <View className="flex-row items-center justify-between mt-5">
                  <FontAwesome name="money" size={24} color="white" />
                  <Text className="text-white text-xl font-semibold">
                    GH₵ {homeData?.earnedThisWeek}
                  </Text>
                </View>
              </View>
              <View className="bg-gray-100 p-6 w-[47%] rounded-xl">
                <Text className="text-black">Downlines</Text>
                <View className="flex-row items-center justify-between mt-5">
                  <MaterialCommunityIcons
                    name="account-check-outline"
                    size={24}
                    color="black"
                  />
                  <Text className="text-black text-xl font-semibold">
                    {homeData?.totalRecruits}{" "}
                    {homeData?.totalRecruits > 1 ? "Downlines" : "Downline"}
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* Recruits */}
          <View className="mt-12">
            <View className="flex-row justify-between mb-4">
              <Text
                className={`font-semibold text-lg ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                My Downlines
              </Text>
            </View>

            {/* Referral List */}
            {isLoading || isFetching ? (
              <DownlinesPlaceholder />
            ) : (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mt-2 w-full flex-1"
              >
                <View className="flex-row gap-x-3 justify-center items-center w-full ">
                  {homeData?.userInfo?.recruits?.length > 0 ? (
                    homeData?.userInfo.recruits?.map(
                      (item: any, index: number) => (
                        <View
                          key={index}
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
                            className={`text-xs text-center font-bold ${
                              isDarkMode ? "text-white" : "text-black"
                            } mt-2`}
                          >
                            {item.name}
                          </Text>
                        </View>
                      )
                    )
                  ) : (
                    <View className="flex-1 items-center justify-center h-full w-full max-w-xl">
                      <Text>No recruits</Text>
                    </View>
                  )}
                </View>
              </ScrollView>
            )}
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
    </>
  );
}
