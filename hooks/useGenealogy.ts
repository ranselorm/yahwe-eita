import { useUser } from "@/context/userContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "https://yahwe-eita-api-dev.azurewebsites.net/api/geneology";

const fetchGenealogy = async (token: string) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching genealogy:", error);
    throw error;
  }
};

export const useGenealogy = () => {
  // const token = useSelector((state: RootState) => state.user.token);
  const { user } = useUser();
  const token = user?.token;

  return useQuery({
    queryKey: ["genealogy", token],
    queryFn: async () => {
      if (token) {
        const data = await fetchGenealogy(token);
        return data;
      }
      throw new Error("No token or user_id found");
    },
    enabled: !!token,
  });
};
