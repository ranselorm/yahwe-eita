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
  const isDarkMode = useColorScheme() === "light";

  return (
    <View
      className={`px-4 py-4 mt-3 rounded-xl border ${
        isDarkMode ? "bg-[#2d2d2d]" : "bg-gray-100 border-gray-300"
      }`}
    >
      <View className="flex-row justify-between items-center">
        <Text
          className={`text-lg font-bold ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          {name}
        </Text>
        <View className="flex-row items-center justify-between gap-x-4">
          <Text
            className={`py-1 rounded-full text-2xl font-bold text-green-500`}
          >
            + GHS {amount}
          </Text>
          <View
            className={`${
              isDarkMode ? "bg-white" : "bg-black"
            } w-2 h-2 bg-black rounded-full`}
          />
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
  const isDarkMode = useColorScheme() === "light";
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
