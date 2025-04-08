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
import { jwtDecode } from "jwt-decode";
import { saveUserData } from "@/utils";
import { useUser } from "@/context/userContext";
import { useRegister } from "@/hooks/useRegister";
import { useCountdown } from "@/hooks/useCountdown";
import { useResendOtp } from "@/hooks/useResendOtp";

export default function OTPScreen() {
  const { setUser } = useUser();
  const { pin_id, payload } = useLocalSearchParams<{
    pin_id: string;
    payload: any;
  }>();
  const [pin, setPin] = useState("");
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const { isExpired, resetCountdown, secondsLeft } = useCountdown();

  const registerMutation = useRegister();
  const verifyOtpMutation = useVerifyOtp();
  const resendOtpMutation = useResendOtp();

  const updateUserSession = async (responseData: any) => {
    try {
      const decodedToken: any = jwtDecode(responseData?.data?.id_token);
      const updatedUser = {
        isLoggedIn: true,
        name: `${decodedToken.name}`,
        id: decodedToken.sub,
        email: decodedToken.email,
        picture: decodedToken.picture,
        exp: decodedToken.exp,
        token: responseData?.data?.access_token,
      };

      setUser(updatedUser);
      await saveUserData(updatedUser);
    } catch (error) {
      console.error("Error updating session:", error);
    }
  };

  const handleVerify = () => {
    console.log(payload, "PAYLOAD");
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
          registerMutation.mutate(payload, {
            onSuccess: (data) => {
              updateUserSession(data);
              router.replace("/(tabs)");
            },
            onError: (error) => {
              Toast.show({
                type: "error",
                text1: "Registration Failed",
                text2:
                  (error as any)?.response?.data?.issue?.message ||
                  "Something went wrong!",
                position: "top",
              });
            },
          });
        },
        onError: () => {
          Toast.show({ type: "error", text1: "Invalid OTP" });
        },
      }
    );
  };

  //resend otp
  const resendOtp = () => {
    if (!pin_id) {
      Toast.show({ type: "error", text1: "Missing Pin ID" });
      return;
    }

    resetCountdown(); // Reset the countdown timer when OTP is resent
    // Toast.show({ type: "info", text1: "Resending OTP..." });

    resendOtpMutation.mutate(
      { pinId: pin_id },
      {
        onSuccess: () => {
          Toast.show({ type: "success", text1: "OTP Resent" });
          // registerMutation.mutate(payload, {
          //   onSuccess: (data) => {
          //     updateUserSession(data);
          //     router.replace("/(tabs)");
          //   },
          //   onError: (error) => {
          //     Toast.show({
          //       type: "error",
          //       text1: "Registration Failed",
          //       text2:
          //         (error as any)?.response?.data?.issue?.message ||
          //         "Something went wrong!",
          //       position: "top",
          //     });
          //   },
          // });
        },
        onError: () => {
          Toast.show({ type: "error", text1: "Something went wrong" });
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
      <View className="flex-1 mt-20">
        <Text
          className={`text-2xl font-semibold mb-8 text-center ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          Enter OTP
        </Text>

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
            width: 45,
            height: 45,
          }}
          containerStyle={{
            justifyContent: "space-between",
            paddingHorizontal: 20,
          }}
        />
        <TouchableOpacity
          className="mx-auto w-full max-w-sm mt-6"
          disabled={!isExpired}
          onPress={resendOtp}
          activeOpacity={1.2}
        >
          <Text className={`${isExpired ? "font-bold" : ""}`}>
            SEND ANOTHER CODE ({secondsLeft})
          </Text>
        </TouchableOpacity>
        <Pressable
          onPress={handleVerify}
          // onPress={() => Alert.alert("OTP", "OTP verified")}
          className={`p-3 rounded-xl items-center mx-auto w-full max-w-sm mt-6 ${
            isDarkMode ? "bg-white" : "bg-black"
          } ${pin.length < 6 ? "opacity-50" : ""}`}
        >
          <Text
            className={`text-lg font-semibold ${
              isDarkMode ? "text-black" : "text-white"
            } `}
            disabled={verifyOtpMutation.isPending}
          >
            {verifyOtpMutation.isPending ? (
              <ActivityIndicator size={"small"} />
            ) : (
              "VERIFY OTP"
            )}
          </Text>
        </Pressable>
      </View>

      <Toast />
    </SafeAreaView>
  );
}
