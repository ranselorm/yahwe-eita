import { Alert, View } from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import LoadingScreen from "@/components/LoadingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { setUser, logout } from "@/store/userSlice";
import { getUserData } from "@/utils";

const Page = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getUserData();
        console.log(user, "user data:");
        if (user) {
          console.log("user found");
          dispatch(setUser(user));
          router.replace("/(tabs)");
        } else {
          console.log("cannot find user data");
          router.replace("/login");
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        router.replace("/login");
      }
    };

    checkAuth();
  }, []);

  return <LoadingScreen />;
};

export default Page;
