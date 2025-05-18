import { Alert } from "react-native";
import React, { useEffect } from "react";
import { router } from "expo-router";
import LoadingScreen from "@/components/LoadingScreen";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { setUser, logout } from "@/store/userSlice";
import { getUserData, saveUserData } from "@/utils";
import { RootState } from "@/store/store";
import { useLogin } from "@/hooks/useLogin";

const Page = () => {
  const dispatch = useDispatch();
  const { globalEmail, globalPassword } = useSelector(
    (state: RootState) => state.user
  );
  const loginMutation = useLogin();
  const updateUserSession = async (responseData: any, password: string) => {
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
        password: password,
      };
      dispatch(setUser(updatedUser));
      const userData = await saveUserData(updatedUser);
      console.log(userData, "user data from user session");
    } catch (error) {
      console.error("Error updating session:", error);
      Alert.alert("Error", "Failed to update user session.");
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
          console.log(
            "Global login values before mutation",
            user?.email,
            user?.password
          );
          loginMutation.mutate(
            {
              email: user?.email,
              password: user?.password
            },
            {
              onSuccess: async (data) => {
                await updateUserSession(data, user?.password);
                router.replace("/(tabs)");
                console.log("LOGIN SUCCESS");
              },
              onError: (error) => {
                console.error("Login error:", error);
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
