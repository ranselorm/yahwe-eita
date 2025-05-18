import { RootState } from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";

const API_URL = "https://yahwe-eita-api.azurewebsites.net/api/home";

const fetchHome = async (token: string) => {
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

export const useHome = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const token = user?.token;

  return useQuery({
    queryKey: ["home", token],
    queryFn: async () => {
      if (token) {
        const data = await fetchHome(token);
        return data;
      }
      throw new Error("No token or user_id found");
    },
    enabled: true,
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });
};

// export const useHome = () => {
//   const { user } = useSelector((state: RootState) => state.user);
//   const token = user?.token;

//   console.log(token, "AFTER LOGIN");

//   return useQuery({
//     queryKey: ["home", token],
//     queryFn: () => {
//       // now token is guaranteed to be truthy
//       return fetchHome(token!);
//     },
//     enabled: Boolean(token), // ← only run when token !== undefined
//     staleTime: 0,
//     refetchOnMount: "always",
//     refetchOnWindowFocus: true,
//   });
// };
