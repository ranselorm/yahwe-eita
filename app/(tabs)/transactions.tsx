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
  FontAwesome,
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

const data = [
  {
    id: "1",
    name: "Janelle Addae",
    amount: 5,
    date: "1d",
  },

  {
    id: "2",
    name: "Randy Selorm",
    amount: 5,
    date: "2d",
  },
  {
    id: "3",
    name: "John Doe",
    amount: 5,
    date: "3d",
  },
];

function Card({
  name,
  amount,
  date,
}: {
  name: string;
  amount: number;
  date: string;
}) {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <View
      className={`px-4 py-6 mt-4 rounded-xl ${
        isDarkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <View className="flex-row justify-between items-center">
        <Text
          className={`text-base font-bold ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          {name}
        </Text>
        <View>
          <Text
            className={`${
              amount === 0 ? "bg-accent" : "bg-accent"
            } text-white px-3 py-1 rounded-full text-xs`}
          >
            + GHS {amount}
          </Text>
          <Text
            className={`text-base font-bold ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            {date}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default function Transactions() {
  const isDarkMode = useColorScheme() === "dark";
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
          Transactions
        </Text>
      </View>

      {isLoading ? (
        <ActivityIndicator />
      ) : data?.length === 0 ? (
        <View className="flex-1 items-center justify-center px-4">
          <FontAwesome name="exchange" size={24} color="black" />{" "}
          <Text className="text-center mt-3 text-lg text-gray-500">
            No transaction yet.
          </Text>
          <Text className="text-center text-gray-400 text-sm">
            You haven’t invited anyone yet.
          </Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card name={item.name} amount={item.amount} date={item.date} />
          )}
          className="mt-6"
        />
      )}
    </SafeAreaView>
  );
}
