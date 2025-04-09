import {
  View,
  Text,
  Pressable,
  FlatList,
  useColorScheme,
  Modal,
  TextInput,
  ActivityIndicator,
} from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import ProgressBar from "@/components/ProgressBar";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useInvite } from "@/hooks/useInvite";
import Toast from "react-native-toast-message";
import { useInvitedUsers } from "@/hooks/useInvitedUsers";

function ReferralCard({
  name,
  phone,
  status,
  invited,
  level,
  progress,
}: {
  name: string;
  phone: number;
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
          Recruit
        </Text>
        <Text
          className={`${
            status === "ACCEPTED" ? "bg-accent" : "bg-dark-100"
          } text-white px-3 py-1 rounded-full text-xs`}
        >
          {status}
        </Text>
      </View>

      <View className="mt-2">
        <View className="flex-row justify-between items-center my-4">
          {/* <Text
            className={`text-xl font-semibold ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            {name}
          </Text> */}
          <Text
            className={`text-xl font-semibold ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            {phone}
          </Text>
          {status === "ACCEPTED" ? (
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

        <ProgressBar progress={progress} level={level} />
      </View>
    </View>
  );
}

export default function GenealogyScreen() {
  const isDarkMode = useColorScheme() === "dark";
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  const { data: invitedUsers, isLoading } = useInvitedUsers();

  console.log(invitedUsers, "invitedUsers from useInvitedUsers");

  const inviteMutation = useInvite();

  const handleInvite = () => {
    if (!name || !phone) return;

    inviteMutation.mutate(
      { name, phone },
      {
        onSuccess: () => {
          Toast.show({
            type: "success",
            text1: `Invitation sent to ${name}`,
            text2: "Success",
            position: "top",
          });
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
      className={`flex-1 px-6 ${isDarkMode ? "bg-black" : "bg-white"}`}
    >
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

      {isLoading ? (
        <ActivityIndicator />
      ) : invitedUsers?.length === 0 ? (
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
        <FlatList
          data={invitedUsers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ReferralCard
              name={item.name}
              phone={item.phone}
              status={item.status}
              invited={item.invited}
              level={item.level}
              progress={item.progress}
            />
          )}
          className="mt-6"
        />
      )}

      <View className="absolute bottom-6 left-1/2 -translate-x-1/2 items-center">
        <Pressable
          className="w-12 h-12 bg-black rounded-full items-center justify-center"
          onPress={() => setModalVisible(true)}
        >
          <MaterialIcons name="add" size={24} color="white" />
        </Pressable>
        <Text className="text-black text-semibold text-sm mt-2">
          Invite More Referrals
        </Text>
      </View>

      <Modal visible={isModalVisible} transparent animationType="slide">
        <View className="flex-1 justify-center items-center bg-black/60">
          <View className="bg-white p-6 rounded-lg w-80">
            <Text className="text-lg font-semibold mb-4 text-black">
              Enter name and phone number
            </Text>

            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Randy Selorm"
              className="border border-gray-300 rounded-md p-3 text-center text-lg mb-4"
            />
            <TextInput
              value={phone}
              onChangeText={setPhone}
              placeholder="0244567891"
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
