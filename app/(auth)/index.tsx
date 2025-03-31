import {
  View,
  Text,
  Pressable,
  ScrollView,
  useColorScheme,
} from "react-native";
import { useState } from "react";
import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

function Checkbox({ checked, onChange }: any) {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <Pressable
      onPress={() => onChange(!checked)}
      className="w-6 h-6 border rounded-md"
    >
      {checked && (
        <MaterialIcons
          name="check"
          size={24}
          color={isDarkMode ? "white" : "black"}
          className="absolute -top-1 -left-1"
        />
      )}
    </Pressable>
  );
}

export default function WelcomeScreen() {
  const isDarkMode = useColorScheme() === "dark";
  const [isChecked, setIsChecked] = useState(false);

  return (
    <SafeAreaView
      className={`flex-1 ${
        isDarkMode ? "bg-black" : "bg-white"
      } px-4 py-6 items-center justify-center h-full`}
    >
      <View>
        <View className="mb-5 items-center">
          <MaterialCommunityIcons
            name="account-outline"
            size={38}
            color="black"
            className="mb-4"
          />
          <Text
            className={`text-2xl font-bold ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            YAHWE-EITA
          </Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 items-center justify-center px-2">
          <FontAwesome
            name="handshake-o"
            size={30}
            color="#dc6115"
            className="mb-4"
          />

          <Text
            className={`text-3xl font-bold text-center ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            WELCOME
          </Text>

          <Text
            className={`mt-5 text-lg text-center ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Dear Prospect,
            {"\n"}
            Congratulations on your decision to join Synergesta Culture Ltd, a
            registered company.
            {"\n\n"}
            Synergesta Culture, is a Sales and Marketers concept designed to
            drive sales of goods and services online. The concept is a
            membership affiliate program that is designed essentially to bring
            customers of a chosen brand, via a simple referral and compensation
            formula.
          </Text>

          <View className="mt-6 flex-row items-center">
            <Checkbox checked={isChecked} onChange={setIsChecked} />
            <Text
              className={`ml-2 text-base ${
                isDarkMode ? "text-white" : "text-gray-600"
              }`}
            >
              I agree to the{" "}
              <Text className="text-orange-500">terms and conditions</Text>
            </Text>
          </View>
        </View>
      </ScrollView>

      <Pressable
        disabled={!isChecked}
        className={`mt-6 px-6 py-3 rounded-lg w-[80%] ${
          isChecked ? "bg-primary" : "bg-gray-400"
        }`}
        onPress={() => router.push("/(auth)/landing")}
      >
        <Text className="text-white text-lg font-semibold text-center">
          GET STARTED
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}
