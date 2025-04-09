import React, { useEffect, useState } from "react";
import {
  TextInput,
  Pressable,
  Text,
  useColorScheme,
  ActivityIndicator,
  Alert,
  View,
  TouchableOpacity,
} from "react-native";
import { useLogin } from "@/hooks/useLogin";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { saveUserData } from "@/utils";
import { useUser } from "@/context/userContext";
import { jwtDecode } from "jwt-decode";
import Toast from "react-native-toast-message";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("p@ssw0rd123");
  const router = useRouter();
  const mutation = useLogin();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const { setUser } = useUser();

  const updateUserSession = async (responseData: any) => {
    try {
      const decodedToken: any = jwtDecode(responseData?.data?.id_token);
      console.log(decodedToken, "DECODED TOKEN");
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
      Alert.alert("Error", "Failed to update user session.");
    }
  };

  const handleLogin = () => {
    mutation.mutate(
      { email, password },
      {
        onSuccess: async (data) => {
          updateUserSession(data);
          console.log("Login successful!", data);
          router.replace("/(tabs)");
        },
        onError: (error) => {
          console.error("Login failed:", error.message);
          Toast.show({
            type: "error",
            text1: "Login failed",
            text2: "Wrong email or password.",
            position: "top",
          });
        },
      }
    );
  };

  if (mutation.isPending)
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size={"large"} />
      </SafeAreaView>
    );

  return (
    <SafeAreaView
      className={`flex-1 p-3 ${
        isDarkMode ? "bg-black" : "bg-white"
      }  w-full px-6`}
    >
      <View className="justify-center items-center flex-1">
        <View className="items-center mb-12">
          <MaterialCommunityIcons
            name="account-outline"
            size={38}
            color="black"
            className="mb-2"
          />
          <Text
            className={`text-2xl font-semibold mb-6 ${
              isDarkMode ? "text-white" : "text-secondary-100"
            }`}
          >
            Welcome Back
          </Text>
        </View>
        <TextInput
          placeholder="Email"
          placeholderTextColor={isDarkMode ? "#CCCCCC" : "#666666"}
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
          autoCapitalize="none"
          className={`border rounded-xl p-3 text-base text-center w-full ${
            isDarkMode
              ? "border-white text-white"
              : "border-secondary-100 text-secondary-100"
          }`}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor={isDarkMode ? "#CCCCCC" : "#666666"}
          keyboardType="email-address"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          className={`border rounded-xl p-3 text-base text-center w-full mt-4 ${
            isDarkMode
              ? "border-white text-white"
              : "border-secondary-100 text-secondary-100"
          }`}
        />
        <View className="flex-row justify-end items-center w-full mt-6">
          <TouchableOpacity
            onPress={() => Alert.alert("Feature not available yet")}
          >
            <Text
              className={`${isDarkMode ? "text-white" : "text-secondary-100"}`}
            >
              Forgot password?
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Pressable
        className={`w-full max-w-sm mt-8 p-3 rounded-xl items-center mx-auto ${
          isDarkMode ? "bg-white" : "bg-secondary-100"
        }`}
        onPress={handleLogin}
      >
        <Text
          className={`text-lg font-semibold ${
            isDarkMode ? "text-secondary-100" : "text-white"
          }`}
        >
          Login
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}
