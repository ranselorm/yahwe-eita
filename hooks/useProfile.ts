import { useUser } from "@/context/userContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
    console.error("Error fetching home:", error);
    throw error;
  }
};

export const useProfile = () => {
  const { user } = useUser();
  const token = user?.token;

  return useQuery({
    queryKey: ["profile", token],
    queryFn: () => {
      // now token is guaranteed to be truthy
      return fetchProfile(token!);
    },
    enabled: Boolean(token), // ← only run when token !== undefined
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });
};
