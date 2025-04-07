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
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { useInvite } from "@/hooks/useInvite";
import Countdown from "@/components/Countdown";
import { useHome } from "@/hooks/useHome";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  //hooks
  const inviteMutation = useInvite();
  const { data: homeData } = useHome();
  console.log("This is home data", homeData);

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

        {/* Balance Card */}
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
              Time left until next level: <Countdown />
            </Text>
          </View>
          <View className="flex-row items-center justify-between mt-4 px-4">
            <ProgressBar level={4} progress={50} />
            <Text className="text-white">Level 4</Text>
          </View>
        </View>
        <BalanceCard />
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
              <Text className="text-white text-xl font-semibold">+GHS10</Text>
            </View>
          </View>
          <View className="bg-gray-100 p-6 w-[47%] rounded-xl">
            <Text className="text-black">Referrals this week</Text>
            <View className="flex-row items-center justify-between mt-5">
              <MaterialCommunityIcons
                name="account-check-outline"
                size={24}
                color="black"
              />
              <Text className="text-black text-xl font-semibold">
                +2 People
              </Text>
            </View>
          </View>
        </View>

        <ReferralList />
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
