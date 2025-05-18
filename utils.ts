import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";

export const saveUserData = async (userData: any) => {
  try {
    await AsyncStorage.setItem("userData", JSON.stringify(userData));
    console.log("user saved");
  } catch (error) {
    console.error("Error saving user data:", error);
  }
};

export const saveUserToken = async (token: string) => {
  try {
    await AsyncStorage.setItem("token", JSON.stringify(token));
    console.log("id token saved in local storage", token);
  } catch (error) {
    console.error("Error saving user token", error);
  }
};

export const getUserData = async () => {
  try {
    const data = await AsyncStorage.getItem("userData");
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error retrieving user data:", error);
    return null;
  }
};

export const clearUserData = async () => {
  try {
    await AsyncStorage.removeItem("userData");
    // await AsyncStorage.removeItem("token");
    console.log("user cleared from local storage");
  } catch (error) {
    console.error("Error clearing user data:", error);
  }
};

export const isValidDate = (date: string) => {
  const parsedDate = dayjs(date, "YYYY-MM-DD", true);
  return parsedDate.isValid();
};
