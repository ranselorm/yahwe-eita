import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  useColorScheme,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as yup from "yup";
import { router, useLocalSearchParams } from "expo-router";
import Toast from "react-native-toast-message";
import { useRegister } from "@/hooks/useRegister";
import { useVerify, VerifyType } from "@/hooks/useVerify";
import { useVerifyGhanaCard } from "@/hooks/useVerifyGhanaCard";
import axios from "axios";
import { useFee } from "@/hooks/useFee";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Image } from "expo-image";
import { isValidDate } from "@/utils";

dayjs.extend(customParseFormat);

const validationSchema = yup.object().shape({
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

  ghanaCardNumber: yup
    .string()
    .min(6, "Ghana card number is required")
    .required("Ghana card number is required"),
});

export default function RegisterScreen() {
  // const isDarkMode = useColorScheme() === "dark";
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [feeId, setFeeId] = useState("qGD7Wwq7JylaI");
  const { name, phoneNumber, network } = useLocalSearchParams();
  const fullName = name ? JSON.parse(name as string) : null;
  const phone = phoneNumber ? JSON.parse(phoneNumber as string) : null;
  const channel = network ? JSON.parse(network as string) : null;
  const { accessToken, sponsorId } = useSelector((s: RootState) => s.user);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  console.log({ accessToken, sponsorId });

  const monthMap: Record<string, string> = {
    january: "01",
    february: "02",
    march: "03",
    april: "04",
    may: "05",
    june: "06",
    july: "07",
    august: "08",
    september: "09",
    october: "10",
    november: "11",
    december: "12",
  };

  function toIsoDate(input: unknown): string {
    if (!input || typeof input !== "string") {
      return "";
    }
    const s = input.trim();

    // 1) Already ISO? YYYY-MM-DD (maybe with time after)
    const isoMatch = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
    if (isoMatch) {
      const [, y, m, d] = isoMatch;
      // pad month/day to two digits
      const mm = m.padStart(2, "0");
      const dd = d.padStart(2, "0");
      return `${y}-${mm}-${dd}`;
    }

    // 2) Try native Date parser
    const dt = new Date(s);
    if (!isNaN(dt.getTime())) {
      return dt.toISOString().slice(0, 10); // "YYYY-MM-DD"
    }

    // 3) Manual month-name mapping
    const parts = s.split(/\s+/);
    if (parts.length !== 3) {
      throw new Error(`toIsoDate: expected "YYYY MMMM DD", got "${s}"`);
    }
    const [year, monthName, dayPart] = parts;
    const mm = monthMap[monthName.toLowerCase()];
    if (!mm) {
      throw new Error(`toIsoDate: unrecognized month "${monthName}"`);
    }
    const dd = dayPart.padStart(2, "0");
    return `${year}-${mm}-${dd}`;
  }

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    ghanaCardNumber: "",
  });

  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  const addLeadingZero = (value: string) => {
    return value.length <= 1 ? `0${value}` : value;
  };

  const registerMutation = useRegister(accessToken, true);
  const feeMutation = useFee();

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

  //verify phone (momo) number
  const { data, error, isFetching, refetch } = useVerify(
    { type: "phone" as VerifyType, id: phone, provider: "mtn-gh" },
    accessToken,
    {
      queryKey: ["verify", { type: "phone", id: phone, provider: "mtn-gh" }],
      enabled: false,
      retry: false,
    }
  );

  //verify ghana card
  const {
    data: ghanaCardVerifyData,
    error: ghanaCardVerifyError,
    isFetching: ghanaCardVerifyFetching,
    refetch: ghanaCardVerifyRefetch,
  } = useVerifyGhanaCard(formData.ghanaCardNumber, accessToken, {
    queryKey: ["verifyGhanaCard", formData.ghanaCardNumber],
    enabled: formData.ghanaCardNumber.length === 15,
  });
  const ghanaCardData = ghanaCardVerifyData?.data?.data;
  useEffect(() => {
    if (formData.ghanaCardNumber.length === 15) {
      ghanaCardVerifyRefetch();
    }
  }, [formData.ghanaCardNumber, ghanaCardVerifyRefetch]);

  // handle results
  useEffect(() => {
    if (ghanaCardVerifyFetching) return;

    if (ghanaCardVerifyData) {
      Toast.show({ type: "success", text1: "Ghana Card verified" });
    } else if (
      ghanaCardVerifyError &&
      axios.isAxiosError(error) &&
      error.response?.status === 500
    ) {
      Toast.show({
        type: "error",
        text1: "Card not found",
        text2: "Please check the ID format",
      });
    } else if (error) {
      Toast.show({
        type: "error",
        text1: "Network error",
        text2: "Try again later",
      });
    }
  }, [
    ghanaCardVerifyFetching,
    ghanaCardVerifyData,
    ghanaCardVerifyError,
    router,
  ]);

  const payload = {
    fullName: fullName && fullName,
    email: formData.email,
    password: formData.password,
    phone: phone && phone,
    dateOfBirth: ghanaCardData?.dateOfBirth
      ? toIsoDate(ghanaCardData?.dateOfBirth || "")
      : `${year}-${addLeadingZero(month)}-${addLeadingZero(day)}`,
    sponsorId: sponsorId,
    ghanaCardNumber: formData.ghanaCardNumber,
    channel: channel,
    feeId: feeId,
  };

  const feePayload = {
    phone: phone,
    customerName: fullName,
    customerEmail: formData.email,
    channel: channel, // mtn-gh | vodafone-gh | tigo-gh
  };

  const handleSubmit = async () => {
    try {
      await validationSchema.validate(formData);
      registerMutation.mutate(payload, {
        onSuccess: () => {
          setTimeout(() => {
            setIsModalVisible(true);
          }, 1000);
        },
        onError: (error) => {
          // console.log(error?.response?.data, "Axios response:");
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

  const handlePayment = async () => {
    try {
      feeMutation.mutate(feePayload, {
        onSuccess: (data) => {
          router.push({
            pathname: "/(auth)/status",
            params: {
              payload: JSON.stringify({
                fullName: fullName,
                email: formData.email,
                password: formData.password,
                phone: phone,
                dateOfBirth: toIsoDate(ghanaCardData?.dateOfBirth || ""),
                sponsorId: sponsorId,
                ghanaCardNumber: formData.ghanaCardNumber,
                channel: channel,
                feeId: data?.data?.reference,
              }),
              reference: data?.data?.reference,
            },
          });
        },
        onError: (error) => {
          console.log(error);
          console.log("Axios response:", error?.response);
          Toast.show({
            type: "error",
            text1: "Payment failed!",
            text2: (error as any)?.message || "Something went wrong!",
            position: "top",
          });
        },
      });
    } catch (error) {
      showErrorToast((error as any).message);
    }
  };

  const isButtonDisabled =
    !formData.email ||
    !formData.password ||
    !formData.ghanaCardNumber ||
    // !isValidDate(`${year}-${addLeadingZero(month)}-${addLeadingZero(day)}`) ||
    registerMutation.isPending;

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <Modal
        visible={isModalVisible}
        transparent
        presentationStyle="overFullScreen"
        statusBarTranslucent
        hardwareAccelerated
        animationType="slide"
      >
        <View className="flex-1 justify-center items-center bg-black/60 p-6">
          <View className="bg-white p-6 rounded-lg w-full">
            <View className="items-center">
              <Image
                source={{ uri: "momo" }}
                style={{ width: 100, height: 100, borderRadius: 4 }}
              />
              <Text className="text-lg font-semibold my-4 text-center text-black">
                Set up Mobile Money
              </Text>
            </View>

            <TextInput
              value={phone}
              editable={false}
              selectTextOnFocus={false}
              className="bg-gray-200 border border-gray-300 rounded-md p-3 text-center text-lg mb-4"
            />

            <Pressable
              className="bg-primary p-3 rounded-md items-center"
              onPress={handlePayment}
              disabled={feeMutation.isPending}
            >
              <Text className="text-white text-lg font-semibold">
                {feeMutation.isPending ? (
                  <ActivityIndicator size={"small"} />
                ) : (
                  "Proceed to purchase GHS 80 airtime"
                )}
              </Text>
            </Pressable>
            <Pressable
              className="mt-4 items-center"
              onPress={() => setIsModalVisible(false)}
            >
              <Text className="text-gray-600 text-sm">Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <SafeAreaView
        className={`flex-1 p-6 ${isDarkMode ? "bg-secondary-100" : "bg-white"}`}
      >
        <View className="flex-row justify-between mb-5 items-center">
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={25}
              color={`${isDarkMode ? "white" : "black"}`}
            />
          </TouchableOpacity>

          <Text
            className={`text-2xl font-semibold ml-2 ${
              isDarkMode ? "text-white" : "text-secondary-100"
            }`}
          >
            Register
          </Text>
          <Text
            className={`text-lg font-semibold ml-2 opacity-0 ${
              isDarkMode ? "text-white" : "text-secondary-100"
            }`}
          >
            Reg
          </Text>
        </View>
        {/* <KeyboardAwareScrollView
          bottomOffset={10}
          className="flex-1"
          contentContainerStyle={{
            justifyContent: "center",
            flex: 1,
          }}
        > */}
        <View className="flex-1 justify-center items-center h-full">
          <View className="w-full max-w-sm gap-y-6">
            <TextInput
              value={fullName}
              editable={false}
              selectTextOnFocus={false}
              className={`border rounded-xl p-3 text-base text-center bg-gray-100  border-gray-300 ${
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

            {/* <TextInput
              placeholder="PHONE NUMBER (MOMO ENABLED)"
              value={phone}
              editable={false}
              selectTextOnFocus={false}
              className={`border rounded-xl p-3 text-base text-center bg-gray-100 ${isDarkMode
                ? "border-white text-white"
                : "border-secondary-100 text-secondary-100"
                }`}
            /> */}

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

            {ghanaCardVerifyFetching ? (
              <ActivityIndicator />
            ) : ghanaCardData ? (
              <Text className="text-center font-bold text-sm">
                Ghana card verified as: {ghanaCardData?.name}
              </Text>
            ) : (
              ""
            )}

            {
              formData.ghanaCardNumber &&
                !ghanaCardData?.dateOfBirth &&
                ghanaCardData?.name &&
                !ghanaCardVerifyFetching && (
                  <View className="gap-y-2">
                    <Text className="text-red-500 text-center">
                      Date of birth not found.
                    </Text>
                    <Text className="text-center">
                      Kindly enter your date of birth
                    </Text>
                    <View className="flex-row items-center w-full justify-between mt-2">
                      <TextInput
                        maxLength={4}
                        multiline={false}
                        value={year}
                        onChangeText={(value) => setYear(value)}
                        keyboardType="numeric"
                        placeholder="YYYY"
                        className="w-1/4 border rounded-xl p-3 text-base h-[90%] text-center border-secondary-100 text-secondary-100 dark:border-white dark:text-white"
                      />
                      <TextInput
                        multiline={false}
                        maxLength={2}
                        value={month}
                        onChangeText={(value) => setMonth(value)}
                        keyboardType="numeric"
                        placeholder="MM"
                        className="w-1/4 border rounded-xl p-3 text-base h-[90%] text-center border-secondary-100 text-secondary-100 dark:border-white dark:text-white"
                      />
                      <TextInput
                        multiline={false}
                        maxLength={2}
                        value={day}
                        onChangeText={(value) => setDay(value)}
                        keyboardType="numeric"
                        placeholder="DD"
                        className="w-1/4 border rounded-xl p-3 text-base h-[90%] text-center border-secondary-100 text-secondary-100 dark:border-white dark:text-white"
                      />
                    </View>
                  </View>
                )
              // <TextInput
              //   placeholder="DATE OF BIRTH YYYY-MM-DD"
              //   value={ghanaCardData?.dateOfBirth}
              //   editable={true}
              //   selectTextOnFocus={false}
              //   className={`border rounded-xl p-3 text-base text-center  border-gray-300 ${isDarkMode
              //       ? "border-white text-white"
              //       : "border-secondary-100 text-secondary-100"
              //     }`}
              // />
            }

            {/* <TextInput
              value={channel.toUpperCase()}
              editable={false}
              selectTextOnFocus={false}
              className={`border rounded-xl p-3 text-base text-center  border-gray-300 bg-gray-100 ${isDarkMode
                ? "border-white text-white"
                : "border-secondary-100 text-secondary-100"
                }`}
            /> */}
          </View>
        </View>
        {/* </KeyboardAwareScrollView> */}
        <Pressable
          className={`w-full max-w-sm p-3 rounded-xl items-center mx-auto  ${
            isDarkMode ? "bg-white" : "bg-secondary-100"
          } ${isButtonDisabled ? "opacity-50" : ""}`}
          onPress={handleSubmit}
        >
          <Text
            className={`text-lg font-semibold ${
              isDarkMode ? "text-secondary-100" : "text-white"
            }`}
          >
            {registerMutation.isPending ? (
              <ActivityIndicator size={"small"} />
            ) : (
              "CREATE ACCOUNT"
            )}
          </Text>
          {/* <Text>CREATE</Text> */}
        </Pressable>
        <Toast />
      </SafeAreaView>
    </>
  );
}
