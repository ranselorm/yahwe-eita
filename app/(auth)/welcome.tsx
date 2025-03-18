import {
  View,
  Text,
  Pressable,
  ScrollView,
  useColorScheme,
} from "react-native";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

function Checkbox({ checked, onChange }: any) {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <Pressable
      onPress={() => onChange(!checked)}
      className="w-5 h-5 border rounded-md"
    >
      {checked && (
        <MaterialIcons
          name="check"
          size={24}
          color={isDarkMode ? "white" : "black"}
          className="absolute top-0 left-0"
        />
      )}
    </Pressable>
  );
}

export default function WelcomeScreen() {
  const isDarkMode = useColorScheme() === "dark";
  const [isChecked, setIsChecked] = useState(false);

  return (
    <View
      className={`flex-1 ${isDarkMode ? "bg-black" : "bg-white"} px-4 py-6`}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Title */}
        <Text
          className={`text-3xl font-semibold ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          WELCOME
        </Text>

        {/* Description Text */}
        <Text
          className={`mt-4 text-lg ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Dear Prospect,
          {"\n\n"}
          Congratulations on your decision to join Synergesta Culture Ltd, a
          registered company.
          {"\n\n"}
          Synergesta Culture, is a Sales and Marketers concept designed to drive
          sales of goods and services online. The concept is a membership
          affiliate program that is designed essentially to bring customers of a
          chosen brand, via a simple referral and compensation formula.
        </Text>

        {/* Checkbox for Terms and Conditions */}
        <View className="mt-6 flex-row items-center">
          <Checkbox checked={isChecked} onChange={setIsChecked} />
          <Text
            className={`ml-2 text-sm ${
              isDarkMode ? "text-white" : "text-gray-600"
            }`}
          >
            I agree to the{" "}
            <Text className="text-orange-500">terms and conditions</Text>
          </Text>
        </View>
      </ScrollView>

      {/* Get Started Button */}
      <Pressable
        disabled={!isChecked}
        className={`mt-6 px-6 py-3 rounded-lg ${
          isChecked ? "bg-primary" : "bg-gray-400"
        }`}
      >
        <Text className="text-white text-lg font-semibold text-center">
          GET STARTED
        </Text>
      </Pressable>
    </View>
  );
}
