import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  useColorScheme,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import Toast from "react-native-toast-message";
import { useVerifyOtp } from "@/hooks/useVerifyOtp";
import { SafeAreaView } from "react-native-safe-area-context";
import OTPTextInput from "react-native-otp-textinput";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function OTPScreen() {
  const { pin_id, payload } = useLocalSearchParams<{
    pin_id: string;
    payload: any;
  }>();

  const [pin, setPin] = useState("");
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  console.log(pin_id, payload);

  const verifyOtpMutation = useVerifyOtp();

  const handleVerify = () => {
    if (!pin.trim()) {
      Toast.show({ type: "error", text1: "OTP is required" });
      return;
    }
    if (!pin_id) {
      Toast.show({ type: "error", text1: "Missing pin ID" });
      return;
    }

    verifyOtpMutation.mutate(
      { pinId: pin_id, pin: pin },
      {
        onSuccess: () => {
          Toast.show({ type: "success", text1: "OTP verified" });
          // router.replace("/(tabs)");
        },
        onError: () => {
          Toast.show({ type: "error", text1: "Invalid OTP" });
        },
      }
    );
  };

  return (
    <SafeAreaView
      className={`flex-1 p-3 ${isDarkMode ? "bg-black" : "bg-white"}`}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <MaterialCommunityIcons
          name="arrow-left"
          size={25}
          color={`${isDarkMode ? "white" : "black"}`}
        />
      </TouchableOpacity>
      <View className="flex-1 justify-center items-center">
        <Text
          className={`text-2xl font-semibold mb-8 text-center ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          Enter OTP
        </Text>

        {/* <TextInput
          value={pin}
          onChangeText={setPin}
          // placeholder="ENTER PHONE NUMBER"
          placeholderTextColor={isDarkMode ? "#CCCCCC" : "#666666"}
          className={`w-full max-w-sm border rounded-xl p-3 text-center text-lg ${
            isDarkMode ? "border-white text-white" : "border-black text-black"
          }`}
        /> */}

        <OTPTextInput
          inputCount={6}
          handleTextChange={setPin}
          defaultValue={pin}
          tintColor="#000"
          offTintColor="#ccc"
          textInputStyle={{
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#000",
            backgroundColor: "#f0f0f0",
            width: 50,
            height: 50,
          }}
          containerStyle={{
            justifyContent: "space-between",
            paddingHorizontal: 20,
          }}
        />
      </View>
      <Pressable
        onPress={handleVerify}
        // onPress={() => Alert.alert("OTP", "OTP verified")}
        className={`p-3 rounded-xl items-center ${
          isDarkMode ? "bg-white" : "bg-black"
        }`}
      >
        <Text
          className={`text-lg font-semibold ${
            isDarkMode ? "text-black" : "text-white"
          }`}
          disabled={verifyOtpMutation.isPending}
        >
          {verifyOtpMutation.isPending ? (
            <ActivityIndicator size={"small"} />
          ) : (
            "VERIFY OTP"
          )}
        </Text>
      </Pressable>
      <Toast />
    </SafeAreaView>
  );
}
