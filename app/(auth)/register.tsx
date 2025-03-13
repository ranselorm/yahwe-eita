import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  useColorScheme,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";

export default function RegisterScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  // State Management
  const [network, setNetwork] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  return (
    <SafeAreaView
      className={`flex-1 justify-center items-center px-4 ${
        isDarkMode ? "bg-black" : "bg-white"
      }`}
    >
      {/* Header */}
      <Text
        className={`text-2xl font-semibold mb-6 ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        Create an account
      </Text>

      {/* Input Fields */}
      <View className="w-full max-w-sm space-y-4">
        <TextInput
          placeholder="FULL NAME"
          placeholderTextColor={isDarkMode ? "#CCCCCC" : "#666666"}
          className={`border-2 rounded-lg p-3 text-lg ${
            isDarkMode ? "border-white text-white" : "border-black text-black"
          }`}
        />
        <TextInput
          placeholder="EMAIL"
          placeholderTextColor={isDarkMode ? "#CCCCCC" : "#666666"}
          keyboardType="email-address"
          className={`border-2 rounded-lg p-3 text-lg ${
            isDarkMode ? "border-white text-white" : "border-black text-black"
          }`}
        />
        <TextInput
          placeholder="PHONE NUMBER (MOMO ENABLED)"
          placeholderTextColor={isDarkMode ? "#CCCCCC" : "#666666"}
          keyboardType="phone-pad"
          className={`border-2 rounded-lg p-3 text-lg ${
            isDarkMode ? "border-white text-white" : "border-black text-black"
          }`}
        />
        <TextInput
          placeholder="GHANA CARD NUMBER"
          placeholderTextColor={isDarkMode ? "#CCCCCC" : "#666666"}
          className={`border-2 rounded-lg p-3 text-lg ${
            isDarkMode ? "border-white text-white" : "border-black text-black"
          }`}
        />
        <TextInput
          placeholder="REFERRAL CODE"
          placeholderTextColor={isDarkMode ? "#CCCCCC" : "#666666"}
          className={`border-2 rounded-lg p-3 text-lg ${
            isDarkMode ? "border-white text-white" : "border-black text-black"
          }`}
        />

        {/* Select Network Dropdown */}
        <View
          className={`border-2 rounded-lg p-3 ${
            isDarkMode ? "border-white" : "border-black"
          }`}
        >
          <Picker
            selectedValue={network}
            onValueChange={(itemValue) => setNetwork(itemValue)}
            style={{
              color: isDarkMode ? "white" : "black",
            }}
          >
            <Picker.Item label="SELECT YOUR NETWORK" value="" />
            <Picker.Item label="MTN" value="mtn" />
            <Picker.Item label="Vodafone" value="vodafone" />
            <Picker.Item label="AirtelTigo" value="airteltigo" />
          </Picker>
        </View>

        {/* Password Input */}
        <TextInput
          placeholder="PASSWORD"
          placeholderTextColor={isDarkMode ? "#CCCCCC" : "#666666"}
          secureTextEntry
          className={`border-2 rounded-lg p-3 text-lg ${
            isDarkMode ? "border-white text-white" : "border-black text-black"
          }`}
        />
      </View>

      {/* Terms & Conditions */}
      <View className="flex-row items-center mt-4">
        <Switch
          value={termsAccepted}
          onValueChange={() => setTermsAccepted(!termsAccepted)}
          thumbColor={isDarkMode ? "black" : "white"}
          trackColor={{ false: "#767577", true: "#34D399" }}
        />
        <Text className={`ml-2 ${isDarkMode ? "text-white" : "text-black"}`}>
          I AGREE TO THE{" "}
          <Text className="text-blue-500 underline">TERMS AND CONDITIONS</Text>
        </Text>
      </View>

      {/* Create Account Button */}
      <Pressable
        className={`w-full max-w-sm mt-6 p-3 rounded-lg items-center ${
          isDarkMode ? "bg-white" : "bg-black"
        }`}
        disabled={!termsAccepted} // Disable if terms not accepted
      >
        <Text
          className={`text-lg font-semibold ${
            isDarkMode ? "text-black" : "text-white"
          }`}
        >
          CREATE ACCOUNT
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}
