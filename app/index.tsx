import { Alert, View } from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import LoadingScreen from "@/components/LoadingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { setUser, logout } from "@/store/userSlice";
import { getUserData, saveUserData, saveUserToken } from "@/utils";
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
      await saveUserData(updatedUser);
      dispatch(setUser(updatedUser));
    } catch (error) {
      console.error("Error updating session:", error);
      Alert.alert("Error", "Failed to update user session.");
    }
  };

  // useEffect(() => {

  //   const checkAuth = async () => {
  //     try {
  //       const user = await getUserData();
  //       console.log(user, "user data:");
  //       if (user) {
  //         dispatch(setUser(user));
  //         router.replace("/(tabs)");
  //       } else {
  //         console.log("cannot find user data");
  //         router.replace("/login");
  //       }
  //     } catch (err) {
  //       console.error("Auth check failed:", err);
  //       router.replace("/login");
  //     }
  //   };
  //   checkAuth();
  // }, []);

  // useEffect(() => {
  //   const currentDate = new Date();

  //   async () => {
  //     const user = await getUserData();
  //     if (user?.idToken) {
  //       const decodedToken = jwtDecode(user?.idToken);
  //       if ((decodedToken.exp ?? 0) * 1000 < currentDate.getTime()) {
  //         loginMutation.mutate(
  //           { email: globalEmail, password: globalPassword },
  //           {
  //             onSuccess: async (data) => {
  //               updateUserSession(data);
  //               router.replace("/(tabs)");
  //             },
  //             onError: (error) => {
  //               console.error("Login failed:", error.message);
  //               Toast.show({
  //                 type: "error",
  //                 text1: "Login failed",
  //                 position: "top",
  //               });
  //               dispatch(logout());
  //               router.replace("/(auth)");
  //             },
  //           }
  //         );
  //       }
  //     }
  //   };

  //   const decodedToken = jwtDecode(
  //     "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImRvOVBhcXVudGFqRTZmSHJlZ3UtNSJ9.eyJuaWNrbmFtZSI6InJhbnNlbG9ybSIsIm5hbWUiOiJUT1JHQkVZIFNFTE9STSBHT0RTT04iLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvZTA4YmU1OWI1ZDE1NDZhMTc3M2U4NTQ1NWI2NTRiOTQ_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZ0cy5wbmciLCJ1cGRhdGVkX2F0IjoiMjAyNS0wNS0xMlQwODowNDoyMy42NjRaIiwiZW1haWwiOiJyYW5zZWxvcm1AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJpc3MiOiJodHRwczovL2Rldi0xeTc3Z2ZseDA2NzJtMDVqLnVzLmF1dGgwLmNvbS8iLCJhdWQiOiJJUnNwUkRsWEZTZk1QS2ZtY3NHamZNQjFiQjVjTnp6aiIsInN1YiI6ImF1dGgwfDY4MGY3MTllN2NjYzIxNDVmNzdhZDY0NCIsImlhdCI6MTc0NzAzNzA2MywiZXhwIjoxNzQ3MDczMDYzfQ.avvqlHwX12rcAqiD6r4mZzc1m8oHM3DFKCIlT5oTsakyAxBqL9wdWleanUxNpxJA4Aq1KkIsD3wUfl_c6Dxl7NNnbA3e5Su8-sSua3QoLN-mh1_m_P_buZY-3v91V0EMK9iNAgag8lV0ipSnicneH253lA8-EpB6TtjNZmAwpl1m7-bEfs0bHKg_VOxIr2tYrQpGZm0LIJzM4F4xTzX0n4hYWroyZvQmFOwq6zLAx2sfqFMrJjwLVEprLCjnzux8T18Ap8ROEYSzqnfges10g2SIINiKx9Jl19YIoBU9XfKyGryul0hVjZatwXP5uQgTm862qbtQcWIt89KTeS5epA"
  //   );

  //   if (user?.accessToken) {
  //     if (user?.user?.isLoggedIn) {
  //       if ((decodedToken?.exp ?? 0) * 1000 < currentDate.getTime()) {
  //         loginMutation.mutate(
  //           { email: globalEmail, password: globalPassword },
  //           {
  //             onSuccess: async (data) => {
  //               updateUserSession(data);
  //               router.replace("/(tabs)");
  //             },
  //             onError: (error) => {
  //               console.error("Login failed:", error.message);
  //               Toast.show({
  //                 type: "error",
  //                 text1: "Login failed",
  //                 position: "top",
  //               });
  //               dispatch(logout());
  //               router.replace("/(auth)");
  //             },
  //           }
  //         );
  //       } else {
  //         router.replace("/(tabs)");
  //       }
  //     } else {
  //       router.replace("/(auth)");
  //     }
  //   } else {
  //     router.replace("/(auth)");
  //   }
  // }, []);
  useEffect(() => {
    setTimeout(() => {
      router.replace("/(auth)");
    }, 1000);
  }, []);

  return <LoadingScreen />;
};

export default Page;
