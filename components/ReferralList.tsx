import { View, Text, ScrollView, useColorScheme } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function ReferralList({ recruits }: any) {
  console.log(recruits);
  const isDarkMode = useColorScheme() === "dark";
  const referrals = [
    { name: "Janelle Addae", verified: true },
    { name: "Seth Agyemang", verified: true },
    { name: "Andrews Peter", verified: false },
  ];

  return (
    <View className="mt-6">
      <View className="flex-row justify-between mb-4">
        <Text
          className={`font-semibold text-lg ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          My Downlines
        </Text>
        {/* <Text className="text-orange-500 font-semibold">See All</Text> */}
      </View>

      {/* Referral List */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mt-2 w-full flex-1"
      >
        <View className="flex-row gap-x-3 justify-center items-center ">
          {recruits?.map((item: any, index: number) => (
            <View
              key={index}
              className={`w-[116px] h-24 rounded-lg items-center justify-center  ${
                isDarkMode ? "bg-dark-100" : "bg-gray-200"
              }`}
            >
              {/* <View className="absolute top-1 right-2">
                {item.verified === true ? (
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
              </View> */}
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
                className={`text-center text-xs ${
                  isDarkMode ? "text-white" : "text-black"
                } mt-2`}
              >
                {item.name}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
