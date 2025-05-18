import { useUser } from "@/context/userContext";
import { RootState } from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";

const API_URL = "https://yahwe-eita-api.azurewebsites.net/api/profile";

const fetchProfile = async (token: string) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data?.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

export const useProfile = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const token = user?.token;

  return useQuery({
    queryKey: ["profile", token],
    queryFn: () => {
      return fetchProfile(token!);
    },
    enabled: Boolean(token),
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });
};
