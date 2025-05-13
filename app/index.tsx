import { Alert, View } from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import LoadingScreen from "@/components/LoadingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { setUser, logout } from "@/store/userSlice";
import { getUserData, saveUserData } from "@/utils";
import { RootState } from "@/store/store";
import { useLogin } from "@/hooks/useLogin";
import Toast from "react-native-toast-message";

const Page = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state);
  const { globalEmail, globalPassword } = useSelector(
    (state: RootState) => state.user
  );
  const loginMutation = useLogin();
  const updateUserSession = async (responseData: any) => {
    try {
      const decodedToken: any = jwtDecode(responseData?.data?.id_token);
      const updatedUser = {
        isLoggedIn: true,
        name: decodedToken.name,
        id: decodedToken.sub,
        email: decodedToken.email,
        picture: decodedToken.picture,
        token: responseData?.data?.access_token,
        idToken: responseData?.data?.id_token,
        password: globalPassword,
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

  useEffect(() => {
    const currentDate = new Date();
    (async () => {
      const user = await getUserData();
      console.log(user?.idToken, "user id token:");
      if (user?.idToken) {
        const decodedToken = jwtDecode(user?.idToken);
        if ((decodedToken.exp ?? 0) * 1000 < currentDate.getTime()) {
          console.log("Token expired");
          console.log("Global login values before mutation", {
            globalEmail,
            globalPassword,
          });
          loginMutation.mutate(
            { email: globalEmail, password: globalPassword },
            {
              onSuccess: async (data) => {
                const userDatas = await updateUserSession(data);
                if (userDatas) {
                  router.replace("/(tabs)");
                }
              },
              onError: (error) => {
                console.error("Login failed:", error.message);
                dispatch(logout());
                router.replace("/(auth)");
              },
            }
          );
        } else {
          console.log("Redirecting to tabs");
          dispatch(setUser(user));
          console.log("Global login values after user was dispatched", {
            globalEmail,
            globalPassword,
          });
          router.replace("/(tabs)");
        }
      } else {
        router.replace("/(auth)");
        console.log("Token not found");
      }
    })();
  }, []);

  return <LoadingScreen />;
};

export default Page;
