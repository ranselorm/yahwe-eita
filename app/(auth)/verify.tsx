import { useState } from "react";
import {
  Text,
  TextInput,
  Pressable,
  useColorScheme,
  ActivityIndicator,
  Modal,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { useVerifyRefCode } from "@/hooks/useVerifyRefCode";
import { useUser } from "@/context/userContext";

export default function VerifyScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const { setReferenceCode } = useUser();

  const [reference, setReference] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpModalVisible, setOtpModalVisible] = useState(false);
  const [pinId, setPinId] = useState("");

  setReference(reference);
  const verifyMutation = useVerifyRefCode();

  // Handle OTP Submission
  const handleOtpSubmit = () => {
    if (otp.length !== 6) {
      Toast.show({
        type: "error",
        text1: "Invalid OTP",
        text2: "Please enter a valid 6-digit OTP.",
        position: "top",
      });
      return;
    }

    // Assume OTP validation is successful, navigate to register
    Toast.show({
      type: "success",
      text1: "OTP Verified",
      text2: "Redirecting to registration...",
      position: "top",
    });

    setTimeout(() => {
      router.push("/(auth)/register");
    }, 2000);
  };

  // Handle Reference Code Submission
  const handleVerification = async () => {
    if (!reference.trim()) {
      Toast.show({
        type: "error",
        text1: "Reference Code Required",
        text2: "Please enter a valid reference code.",
        position: "top",
      });
      return;
    }

    verifyMutation.mutate(
      { reference },
      {
        onSuccess: (data) => {
          if (!data.status) {
            Toast.show({
              type: "error",
              text1: "Invalid Reference Code",
              text2: "You need to be invited by a sponsor to continue.",
              position: "top",
            });
          } else {
            // Show success toast and open OTP modal
            Toast.show({
              type: "success",
              text1: "OTP Sent",
              text2: data.message, // Display message from API
              position: "top",
            });

            // Store pinId and show OTP modal
            setPinId(data.data.pinId);
            setTimeout(() => {
              setOtpModalVisible(true);
            }, 2000);
          }
        },
        onError: () => {
          Toast.show({
            type: "error",
            text1: "Verification Failed",
            text2: "An error occurred. Please try again.",
            position: "top",
          });
        },
      }
    );
  };

  return (
    <SafeAreaView
      className={`flex-1 justify-center items-center px-4 ${
        isDarkMode ? "bg-black" : "bg-white"
      }`}
    >
      <Text
        className={`text-2xl font-semibold mb-8 ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        Verify your account
      </Text>

      <TextInput
        value={reference}
        onChangeText={setReference}
        placeholder="ENTER REFERENCE CODE"
        placeholderTextColor={isDarkMode ? "#CCCCCC" : "#666666"}
        className={`w-full max-w-sm border rounded-xl p-3 text-center text-lg ${
          isDarkMode ? "border-white text-white" : "border-black text-black"
        }`}
      />

      <Pressable
        className={`w-full max-w-sm mt-4 p-3 rounded-xl items-center ${
          isDarkMode ? "bg-white" : "bg-black"
        } ${verifyMutation.isPending ? "opacity-50" : ""}`}
        onPress={handleVerification}
        disabled={verifyMutation.isPending}
      >
        {verifyMutation.isPending ? (
          <ActivityIndicator color={isDarkMode ? "black" : "white"} />
        ) : (
          <Text
            className={`text-lg font-semibold ${
              isDarkMode ? "text-black" : "text-white"
            }`}
          >
            VERIFY
          </Text>
        )}
      </Pressable>

      {/* OTP Modal */}
      <Modal visible={isOtpModalVisible} transparent animationType="slide">
        <View className="flex-1 justify-center items-center bg-black/60">
          <View className="bg-white p-6 rounded-lg w-80">
            <Text className="text-lg font-semibold mb-4 text-black">
              Enter OTP Code
            </Text>

            <TextInput
              value={otp}
              onChangeText={setOtp}
              placeholder="6-digit OTP"
              keyboardType="number-pad"
              maxLength={6}
              className="border border-gray-300 rounded-md p-3 text-center text-lg mb-4"
            />

            <Pressable
              className="bg-black p-3 rounded-md items-center"
              onPress={handleOtpSubmit}
            >
              <Text className="text-white text-lg font-semibold">Submit</Text>
            </Pressable>

            <Pressable
              className="mt-4 items-center"
              onPress={() => setOtpModalVisible(false)}
            >
              <Text className="text-gray-600 text-sm">Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Toast Message Component */}
      <Toast />
    </SafeAreaView>
  );
}
