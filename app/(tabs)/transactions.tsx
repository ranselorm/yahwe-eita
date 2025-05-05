import {
  View,
  Text,
  RefreshControl,
  FlatList,
  useColorScheme,
  ActivityIndicator,
} from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback, useState } from "react";
import { useTransactions } from "@/hooks/useTransactions";
import moment from "moment";

function Card({
  name,
  amount,
  date,
  desc,
}: {
  name: string;
  amount: number;
  date: string;
  desc: string;
}) {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <View
      className={`px-4 py-4 mt-3 rounded-xl border ${
        isDarkMode ? "bg-[#2d2d2d]" : "bg-gray-100 border-gray-300"
      }`}
    >
      <View className="flex-row justify-between items-center">
        <Text
          className={`text-sm font-bold ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          {name}
        </Text>
        <View className="flex-row items-center justify-between gap-x-4">
          <Text
            className={`py-1 rounded-full text-xl font-bold text-green-500`}
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
            {timeAgo(date)}
          </Text>
        </View>
      </View>
      <Text
        className={`text-sm font-bold mt-4 ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        {desc}
      </Text>
    </View>
  );
}

function timeAgo(date: any) {
  return moment(date).fromNow();
}

export default function Transactions() {
  const isDarkMode = useColorScheme() === "dark";
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    data,
    isLoading: transactionsLoading,
    refetch,
    error,
  } = useTransactions();
  console.log(data?.transactions);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  return (
    <SafeAreaView
      className={`flex-1 px-6 ${isDarkMode ? "bg-black" : "bg-white"}`}
    >
      <View className="items-center mt-4 justify-center flex-row px-4">
        <MaterialIcons
          name="history"
          size={24}
          color="black"
          className="pr-2"
        />
        <Text
          className={`text-2xl font-semibold flex-row items-center justify-center ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          Transaction History
        </Text>
      </View>

      {isLoading ? (
        <ActivityIndicator />
      ) : data?.transactions.length === 0 ? (
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
          data={data?.transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card
              name={item?.user?.name}
              amount={item.amount}
              date={item.createdAt}
              t
              desc={item.description}
            />
          )}
          className="mt-6 pb-20"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={"#f97316"}
            />
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}
