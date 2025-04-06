import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  useColorScheme,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Button,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as yup from "yup";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { useRegister } from "@/hooks/useRegister";
import { useUser } from "@/context/userContext";
import { jwtDecode } from "jwt-decode";
import { saveUserData } from "@/utils";
import { useSendOtp } from "@/hooks/useSendOtp";
import DateTimePicker from "@react-native-community/datetimepicker";

const validationSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    // .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one symbol"
    )
    .required("Password is required"),
  phone: yup
    .string()
    .min(10, "Phone number should be at least 10 digits")
    .required("Phone number is required"),
  ghanaCardNumber: yup
    .string()
    .min(6, "Ghana card number is required")
    .required("Ghana card number is required"),
  network: yup.string().required("Network is required"),
  // termsAccepted: yup.boolean().oneOf([true], "You must accept the terms"),
});

export default function RegisterScreen() {
  const isDarkMode = useColorScheme() === "dark";
  const [dob, setDob] = useState<Date>(new Date("2000-01-01"));
  const [showPicker, setShowPicker] = useState<boolean>(false);

  const { sponsorId, setUser } = useUser();

  const onChange = (_event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === "ios");
    if (selectedDate) setDob(selectedDate);
  };

  // console.log(dob.toString());

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    ghanaCardNumber: "",
    network: "",
    // termsAccepted: false,
  });

  const registerMutation = useRegister();
  const sendOtpMutation = useSendOtp();

  const handleChange = (name: string, value: string | boolean) => {
    setFormData({ ...formData, [name]: value });
  };

  const showErrorToast = (message: string) => {
    Toast.show({
      type: "error",
      text1: "Validation Error",
      text2: message,
      position: "top",
    });
  };

  const payload = {
    fullName: formData.fullName,
    email: formData.email,
    password: formData.password,
    phone: formData.phone,
    dateOfBirth: dob.toISOString(),
    sponsorId: sponsorId,
    ghanaCardNumber: formData.ghanaCardNumber,
  };

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
      // Alert.alert("Error", "Failed to update user session.");
    }
  };

  const handleSubmit = async () => {
    try {
      await validationSchema.validate(formData);
      const phone = formData.phone;

      registerMutation.mutate(payload, {
        onSuccess: (data) => {
          updateUserSession(data);

          //Immediately send OTP after registration
          sendOtpMutation.mutate(
            { phone },
            {
              onSuccess: (otpRes) => {
                const pin_id = otpRes?.data?.data?.pinId;

                Toast.show({
                  type: "success",
                  text1: "Registration Successful",
                  text2: otpRes?.data?.message || "OTP sent successfully",
                  position: "top",
                });

                setTimeout(() => {
                  router.replace({
                    pathname: "/otp",
                    params: {
                      // phone: JSON.stringify(phone),
                      pin_id,
                    },
                  });
                }, 2000);
              },

              onError: () => {
                Toast.show({
                  type: "error",
                  text1: "OTP Failed",
                  text2: "Couldn't send OTP after registration.",
                  position: "top",
                });
              },
            }
          );
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
    } catch (error) {
      showErrorToast((error as any).message);
    }
  };

  return (
    <SafeAreaView
      className={`flex-1 px-6 py-6 ${
        isDarkMode ? "bg-secondary-100" : "bg-white"
      }`}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={100}
      >
        <ScrollView contentContainerStyle="">
          <View className="flex-1 justify-center items-center">
            <View className="items-center mb-12">
              <MaterialCommunityIcons
                name="account-outline"
                size={38}
                color="black"
                className="mb-2"
              />
              <Text
                className={`text-2xl font-semibold ${
                  isDarkMode ? "text-white" : "text-secondary-100"
                }`}
              >
                Create account
              </Text>
            </View>
            <View className="w-full max-w-sm gap-y-6">
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

              {/* date */}
              <TouchableOpacity
                onPress={() => setShowPicker(true)}
                activeOpacity={1.5}
              >
                <TextInput
                  placeholder="DATE OF BIRTH"
                  value={dob.toDateString()}
                  className={`border rounded-xl p-3 text-base text-center uppercase ${
                    isDarkMode
                      ? "border-white text-white"
                      : "border-secondary-100 text-secondary-100"
                  }`}
                  editable={false}
                  selectTextOnFocus={false}
                />
              </TouchableOpacity>
              {/* <Text>DOB: {dob.toDateString()}</Text> */}
              {showPicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={dob}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={onChange}
                  maximumDate={new Date()}
                />
              )}

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
            </View>
          </View>
        </ScrollView>
        {/* <Pressable
        className={`w-full max-w-sm p-3 rounded-xl items-center mx-auto  ${
          isDarkMode ? "bg-white" : "bg-secondary-100"
        }`}
        // onPress={handleSubmit}
        onPress={() => console.log(payload)}
        // disabled={registerMutation.isPending}
      >
        <Text
          className={`text-lg font-semibold ${
            isDarkMode ? "text-secondary-100" : "text-white"
          }`}
          disabled={registerMutation.isPending}
        >
          {registerMutation.isPending ? (
            <ActivityIndicator size={"small"} />
          ) : (
            "CREATE ACCOUNT"
          )}
        </Text>
      </Pressable> */}
      </KeyboardAvoidingView>
      <Toast />
    </SafeAreaView>
  );
}
