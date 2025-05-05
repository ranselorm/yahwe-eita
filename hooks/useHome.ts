import { useUser } from "@/context/userContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "https://yahwe-eita-api.azurewebsites.net/api/home";

const fetchHome = async (token: string) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data?.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error("❌ status:", err.response?.status);
      console.error("❌ headers:", err.response?.headers);
      console.error("❌ body:", err.response?.data); // <–– your real error message usually lives here
      // Optionally bubble up a friendlier message
      throw new Error((err.response?.data as any)?.message || err.message);
    }
    console.error("Unexpected error:", err);
    throw err;
  }
};

// export const useHome = () => {
//   const { user } = useUser();
//   const token = user?.token;

//   return useQuery({
//     queryKey: ["home", token],
//     queryFn: async () => {
//       if (token) {
//         const data = await fetchHome(token);
//         return data;
//       }
//       throw new Error("No token or user_id found");
//     },
//     enabled: true,
//     staleTime: 0,
//     refetchOnMount: "always",
//     refetchOnWindowFocus: true,
//   });
// };

export const useHome = () => {
  const { user } = useUser();
  const token = user?.token;

  return useQuery({
    queryKey: ["home", token],
    queryFn: () => {
      // now token is guaranteed to be truthy
      return fetchHome(token!);
    },
    enabled: Boolean(token), // ← only run when token !== undefined
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });
};
