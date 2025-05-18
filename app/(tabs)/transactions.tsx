import {
  View,
  Text,
  RefreshControl,
  FlatList,
  useColorScheme,
  ActivityIndicator,
} from "react-native";
import { Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback, useState } from "react";
import { useTransactions } from "@/hooks/useTransactions";
import moment from "moment";

function Card({
  name,
  type,
  amount,
  date,
  desc,
  reference,
  status,
}: {
  name: string;
  type: string;
  amount: number;
  date: string;
  desc: string;
  reference: string;
  status: string;
}) {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <View
      className={`px-4 py-4 mt-3 rounded-xl ${
        isDarkMode ? "bg-dark-100" : " bg-gray-100 border-black"
      }`}
    >
      <View className="flex-row items-start justify-between">
        <View className="flex-row items-start gap-x-3">
          {type === "AIRTIME" ? (
            <View className="bg-orange-200 p-2 rounded-full">
              {/* <Feather name="phone" size={20} color="#ea580c" /> */}
              <FontAwesome
                name="phone"
                size={20}
                color="#ea580c"
                // className="bg-orange-600"
              />
            </View>
          ) : (
            <View className="bg-green-300 p-2 rounded-full">
              <FontAwesome
                name="money"
                size={20}
                color="#16a34a"
                // className="bg-green-600"
              />
            </View>
          )}

          <View>
            <Text
              className={`text-md ${isDarkMode ? "text-white" : "text-black"}`}
            >
              {type}
            </Text>
          </View>
        </View>
        <View className="flex-row items-center justify-between gap-x-4">
          <Text
            className={`text-lg font-bold ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            GH₵ {amount}
          </Text>
        </View>
      </View>
      <View className="px-12 -mt-3">
        <Text className={`text-sm ${isDarkMode ? "text-white" : "text-black"}`}>
          {desc}
        </Text>
      </View>

      <View
        className={`w-full h-[1px] my-4 rounded-full ${
          isDarkMode ? "bg-white" : "bg-gray-400"
        }`}
      />
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-x-2">
          <Text
            className={`text-xs ${isDarkMode ? "text-white" : "text-black"}`}
          >
            {timeAgo(date)}
          </Text>
          <View
            className={`${
              isDarkMode ? "bg-white" : "bg-black/50"
            } w-2 h-2 rounded-full`}
          />
          <Text
            className={`text-xs ${isDarkMode ? "text-white" : "text-black"}`}
          >
            {reference}
          </Text>
        </View>
        <View
          className={`p-2 rounded-full ${
            status === "COMPLETED"
              ? "bg-green-300"
              : status === "PROCESSING"
              ? "bg-yellow-200"
              : "bg-red-300"
          }`}
        >
          <Text
            className={`text-[9px] ${isDarkMode ? "text-black" : "text-black"}`}
          >
            {status}
          </Text>
        </View>
      </View>
    </View>
  );
}

function timeAgo(date: any) {
  return moment(date).fromNow();
}

export default function Transactions() {
  const isDarkMode = useColorScheme() === "dark";
  const [refreshing, setRefreshing] = useState(false);

  const { data, isLoading, refetch, error } = useTransactions();
  console.log(data?.transactions[0], "transactions");

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
        <SafeAreaView className="flex-1 items-center justify-center">
          <ActivityIndicator />
        </SafeAreaView>
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
              type={item?.type}
              amount={item.amount}
              date={item.createdAt}
              desc={item.description}
              reference={item.reference}
              status={item.status}
            />
          )}
          className="mt-6 pb-5"
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
