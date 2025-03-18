import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  useColorScheme,
  Switch,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { z } from "zod"; // Zod for validation
import { useForm, Controller } from "react-hook-form";
import { router } from "expo-router";

// Zod Schema for form validation
const schema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  network: z.string().min(1, "Network is required"),
  password: z.string().min(6, "Password should be at least 6 characters"),
  termsAccepted: z
    .boolean()
    .refine((val) => val === true, "You must accept the terms"),
});

export default function RegisterScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: (data) => schema.safeParse(data), // Apply validation schema
  });

  const [network, setNetwork] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Handle form submission
  const onSubmit = (data) => {
    // Here you can handle the form submission to the server
    console.log(data);
    router.replace("/(tabs)"); // Navigate to tabs screen
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1 }}
      keyboardVerticalOffset={100}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView
          className={`flex-1 justify-center items-center px-3 ${
            isDarkMode ? "bg-secondary-100" : "bg-white"
          }`}
        >
          <View className="items-center mb-4">
            <MaterialCommunityIcons
              name="account-outline"
              size={38}
              color="black"
              className="mb-4"
            />
            <Text
              className={`text-2xl font-semibold mb-6 ${
                isDarkMode ? "text-white" : "text-secondary-100"
              }`}
            >
              Create an account
            </Text>
          </View>

          <View className="w-full max-w-sm gap-y-6">
            {/* Full Name Input */}
            <Controller
              control={control}
              name="fullName"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="FULL NAME"
                  placeholderTextColor={isDarkMode ? "#CCCCCC" : "#666666"}
                  className={`border rounded-xl p-3 text-base text-center ${
                    isDarkMode
                      ? "border-white text-white"
                      : "border-secondary-100 text-secondary-100"
                  }`}
                />
              )}
            />
            {errors.fullName && (
              <Text className="text-red-500 text-xs">
                {errors.fullName.message}
              </Text>
            )}

            {/* Email Input */}
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="EMAIL"
                  placeholderTextColor={isDarkMode ? "#CCCCCC" : "#666666"}
                  keyboardType="email-address"
                  className={`border rounded-xl p-3 text-base text-center ${
                    isDarkMode
                      ? "border-white text-white"
                      : "border-secondary-100 text-secondary-100"
                  }`}
                />
              )}
            />
            {errors.email && (
              <Text className="text-red-500 text-xs">
                {errors.email.message}
              </Text>
            )}

            {/* Network Picker */}
            <View
              className={`border rounded-xl h-[50px] justify-center relative ${
                isDarkMode ? "border-white" : "border-black"
              }`}
            >
              <Text
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-base"
                style={{ color: isDarkMode ? "white" : "black" }}
              >
                {network ? network.toUpperCase() : "SELECT YOUR NETWORK"}
              </Text>

              <Picker
                selectedValue={network}
                onValueChange={(itemValue) => setNetwork(itemValue)}
                style={{
                  opacity: 0,
                  width: "100%",
                  height: 50,
                  fontSize: 10,
                }}
              >
                <Picker.Item label="SELECT YOUR NETWORK" value="" />
                <Picker.Item label="MTN" value="mtn" />
                <Picker.Item label="Vodafone" value="vodafone" />
                <Picker.Item label="AirtelTigo" value="airteltigo" />
              </Picker>
            </View>
            {errors.network && (
              <Text className="text-red-500 text-xs">
                {errors.network.message}
              </Text>
            )}

            {/* Password Input */}
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="PASSWORD"
                  placeholderTextColor={isDarkMode ? "#CCCCCC" : "#666666"}
                  secureTextEntry
                  className={`border rounded-xl p-3 text-base text-center ${
                    isDarkMode
                      ? "border-white text-white"
                      : "border-secondary-100 text-secondary-100"
                  }`}
                />
              )}
            />
            {errors.password && (
              <Text className="text-red-500 text-xs">
                {errors.password.message}
              </Text>
            )}

            {/* Terms Acceptance */}
            <View className="flex-row items-center mt-4">
              <Switch
                value={termsAccepted}
                onValueChange={() => setTermsAccepted(!termsAccepted)}
                thumbColor={isDarkMode ? "black" : "white"}
                trackColor={{ false: "#767577", true: "#34D399" }}
              />
              <Text
                className={`ml-2 ${
                  isDarkMode ? "text-white" : "text-secondary-100"
                }`}
              >
                I AGREE TO THE{" "}
                <Text className="text-blue-500 underline">
                  TERMS AND CONDITIONS
                </Text>
              </Text>
            </View>
          </View>

          {/* Submit Button */}
          <Pressable
            className={`w-full max-w-sm mt-8 p-3 rounded-xl items-center ${
              isDarkMode ? "bg-white" : "bg-secondary-100"
            }`}
            disabled={!termsAccepted}
            onPress={handleSubmit(onSubmit)} // Submit handler
          >
            <Text
              className={`text-lg font-semibold ${
                isDarkMode ? "text-secondary-100" : "text-white"
              }`}
            >
              CREATE ACCOUNT
            </Text>
          </Pressable>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
