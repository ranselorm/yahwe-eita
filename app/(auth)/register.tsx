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
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as yup from "yup";
import { router } from "expo-router";

// ✅ Validation Schema using Yup
const validationSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one symbol"
    )
    .required("Password is required"),
  phone: yup
    .string()
    .min(10, "Phone number should be at least 10 digits")
    .required("Phone number is required"),
  referenceCode: yup
    .string()
    .min(5, "Reference code is required")
    .required("Reference code is required"),
  ghanaCardNumber: yup
    .string()
    .min(6, "Ghana card number is required")
    .required("Ghana card number is required"),
  network: yup.string().required("Network is required"),
  termsAccepted: yup.boolean().oneOf([true], "You must accept the terms"),
});

export default function RegisterScreen() {
  const isDarkMode = useColorScheme() === "dark";

  // State for form inputs
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    referenceCode: "",
    ghanaCardNumber: "",
    network: "",
    termsAccepted: false,
  });

  // Function to update form state
  const handleChange = (name: any, value: any) => {
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      await validationSchema.validate(formData);
      console.log("Form Data:", formData);
      // API Call or Navigation
      router.replace("/(tabs)");
    } catch (error) {
      Alert.alert("Validation Error", (error as Error).message);
    }
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
          {/* Header */}
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

          {/* Form Fields */}
          <View className="w-full max-w-sm gap-y-6">
            {/** Full Name */}
            <TextInput
              placeholder="FULL NAME"
              value={formData.fullName}
              onChangeText={(value) => handleChange("fullName", value)}
              className={`border rounded-xl p-3 text-base text-center ${
                isDarkMode
                  ? "border-white text-white"
                  : "border-secondary-100 text-secondary-100"
              }`}
            />

            {/** Email */}
            <TextInput
              placeholder="EMAIL"
              value={formData.email}
              onChangeText={(value) => handleChange("email", value)}
              keyboardType="email-address"
              className={`border rounded-xl p-3 text-base text-center ${
                isDarkMode
                  ? "border-white text-white"
                  : "border-secondary-100 text-secondary-100"
              }`}
            />

            {/** Password */}
            <TextInput
              placeholder="PASSWORD"
              value={formData.password}
              onChangeText={(value) => handleChange("password", value)}
              secureTextEntry
              className={`border rounded-xl p-3 text-base text-center ${
                isDarkMode
                  ? "border-white text-white"
                  : "border-secondary-100 text-secondary-100"
              }`}
            />

            {/** Phone Number */}
            <TextInput
              placeholder="PHONE NUMBER (MOMO ENABLED)"
              value={formData.phone}
              onChangeText={(value) => handleChange("phone", value)}
              keyboardType="phone-pad"
              className={`border rounded-xl p-3 text-base text-center ${
                isDarkMode
                  ? "border-white text-white"
                  : "border-secondary-100 text-secondary-100"
              }`}
            />

            {/** Reference Code */}
            <TextInput
              placeholder="REFERENCE CODE"
              value={formData.referenceCode}
              onChangeText={(value) => handleChange("referenceCode", value)}
              className={`border rounded-xl p-3 text-base text-center ${
                isDarkMode
                  ? "border-white text-white"
                  : "border-secondary-100 text-secondary-100"
              }`}
            />

            {/** Ghana Card Number */}
            <TextInput
              placeholder="GHANA CARD NUMBER"
              value={formData.ghanaCardNumber}
              onChangeText={(value) => handleChange("ghanaCardNumber", value)}
              className={`border rounded-xl p-3 text-base text-center ${
                isDarkMode
                  ? "border-white text-white"
                  : "border-secondary-100 text-secondary-100"
              }`}
            />

            {/** Network Picker */}
            <View
              className={`border rounded-xl h-[50px] justify-center relative ${
                isDarkMode ? "border-white" : "border-black"
              }`}
            >
              <Text
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-base"
                style={{ color: isDarkMode ? "white" : "black" }}
              >
                {formData.network
                  ? formData.network.toUpperCase()
                  : "SELECT YOUR NETWORK"}
              </Text>
              <Picker
                selectedValue={formData.network}
                onValueChange={(value) => handleChange("network", value)}
                style={{ opacity: 0, width: "100%", height: 50, fontSize: 10 }}
              >
                <Picker.Item label="SELECT YOUR NETWORK" value="" />
                <Picker.Item label="MTN" value="mtn" />
                <Picker.Item label="Vodafone" value="vodafone" />
                <Picker.Item label="AirtelTigo" value="airteltigo" />
              </Picker>
            </View>

            {/** Terms Acceptance */}
            <View className="flex-row items-center mt-4">
              <Switch
                value={formData.termsAccepted}
                onValueChange={() =>
                  handleChange("termsAccepted", !formData.termsAccepted)
                }
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

          {/** Submit Button */}
          <Pressable
            className={`w-full max-w-sm mt-8 p-3 rounded-xl items-center ${
              isDarkMode ? "bg-white" : "bg-secondary-100"
            }`}
            onPress={handleSubmit}
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
