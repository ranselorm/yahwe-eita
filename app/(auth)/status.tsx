// app/(auth)/status.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  useColorScheme,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import axios from "axios";
import { useRegister } from "@/hooks/useRegister";
import { router, useLocalSearchParams } from "expo-router";
import { jwtDecode } from "jwt-decode";
import { saveUserData } from "@/utils";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import PendingDots from "@/components/PendingDots";
import LoadingScreen from "@/components/LoadingScreen";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/store/userSlice";
import { RootState } from "@/store/store";

export default function StatusScreen() {
  const isDark = useColorScheme() === "dark";
  const { accessToken } = useSelector((state: RootState) => state.user);
  const { reference, payload } = useLocalSearchParams<{
    reference: string;
    payload: string;
  }>();
  const parsedPayload = payload ? JSON.parse(payload) : {};
  const [timeLeft, setTimeLeft] = useState(15);
  const [isChecking, setIsChecking] = useState(false);
  const [done, setDone] = useState(false);
  const [isStillPending, setIsStillPending] = useState(false);
  const dispatch = useDispatch();

  console.log(parsedPayload, "Parsed Payload");
  const showErrorToast = (message: string) => {
    Toast.show({
      type: "error",
      text1: "Validation Error",
      text2: message,
      position: "top",
    });
  };

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // console.log(isChecking, "IS CHECKING");

  const checkStatus = async () => {
    if (!reference) return;
    setIsChecking(true);

    try {
      const { data } = await axios.get(
        "https://yahwe-eita-api.azurewebsites.net/api/fee/status",
        {
          params: { reference },
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (data?.data?.status === "COMPLETED") {
        setDone(true);
        Toast.show({ type: "success", text1: "Payment complete" });
      } else {
        Toast.show({ type: "info", text1: "Payment still pending" });
        setIsStillPending(true);
      }
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Error checking payment",
        text2: err.message,
      });
    } finally {
      setIsChecking(false);
    }
  };

  // Register mutation
  const registerMutation = useRegister(accessToken, false);
  const updateUserSession = async (responseData: any) => {
    try {
      const decodedToken: any = jwtDecode(responseData?.data?.id_token);
      const updatedUser = {
        isLoggedIn: true,
        name: `${decodedToken.name}`,
        id: decodedToken.sub,
        email: decodedToken.email,
        picture: decodedToken.picture,
        token: responseData?.data?.access_token,
        idToken: responseData?.data?.id_token,
        password: parsedPayload.password,
      };
      const userData = await saveUserData(updatedUser);
      dispatch(setUser(updatedUser));
      return userData;
    } catch (error) {
      console.error("Error updating session:", error);
      Alert.alert("Error", "Failed to update user session.");
      return null;
    }
  };

  const handleSubmit = async () => {
    try {
      registerMutation.mutate(parsedPayload, {
        onSuccess: async (data) => {
          const userDatas = await updateUserSession(data);
          if (userDatas) {
            router.replace("/(tabs)");
          }
        },
        onError: (error) => {
          console.log(error?.response?.data, "Axios response:");
          Toast.show({
            type: "error",
            text1: "Registration Failed",
            text2:
              (error as any)?.response?.data?.message ||
              "Something went wrong!",
            position: "top",
          });
        },
      });
    } catch (error) {
      showErrorToast((error as any).message);
    }
  };

  if (registerMutation.isPending) {
    return <LoadingScreen />;
  }

  return (
    <>
      {/* <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor="transparent"
        translucent
      /> */}

      <SafeAreaView
        className={`flex-1 items-center p-6 ${
          isDark ? "bg-black" : "bg-white"
        }`}
      >
        <View className="flex-1 items-center px-6 w-full">
          {done ? (
            <AntDesign name="checkcircle" size={24} color="#5cb85c" />
          ) : isStillPending ? (
            <MaterialIcons name="error-outline" size={62} color="#dc6115" />
          ) : (
            <></>
            // <PendingDots />
          )}

          {done ? (
            <Text
              className={`text-lg font-bold mt-4  ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              Payment Confirmed
            </Text>
          ) : !isStillPending ? (
            <Text
              className={`text-lg font-bold mt-4  ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              Pending Payment
            </Text>
          ) : null}

          <Text
            className={`text-base text-center mt-4 ${
              isDark ? "text-white" : "text-black"
            }`}
          >
            {done
              ? "Press the button below to sign up"
              : isStillPending
              ? "If you didn’t see a payment pop-up, dial *170#, choose 'My Wallet' > 'My Approvals' to approve your transaction manually."
              : "Your payment is pending. Authorize this payment and click the button below."}{" "}
            {!isStillPending && done ? "" : timeLeft}
          </Text>

          <Pressable
            className={`w-full mt-8 p-3 rounded-xl items-center bg-primary ${
              timeLeft > 0 || isChecking ? "opacity-50" : ""
            }`}
            disabled={timeLeft > 0 || isChecking}
            onPress={done ? handleSubmit : checkStatus}
          >
            {isChecking ? (
              <ActivityIndicator color={isDark ? "black" : "white"} />
            ) : (
              <Text
                className={`text-lg ${
                  isDark ? "text-black" : "text-white uppercase"
                } font-semibold`}
              >
                {done ? "Proceed" : "Check Status"}
              </Text>
            )}
          </Pressable>
        </View>
      </SafeAreaView>
    </>
  );
}
