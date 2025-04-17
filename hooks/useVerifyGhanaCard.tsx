import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "https://yahwe-eita-api.azurewebsites.net/api/verify";

const fetchGhanaCard = async (type: string, id: string) => {
  const response = await axios.get(API_URL, {
    params: {
      type,
      id,
    },
  });

  return response?.data;
};

export const useVerifyGhanaCard = (type: string, id: string) => {
  return useQuery({
    queryKey: ["ghanaCard", type, id],
    queryFn: async () => {
      const data = await fetchGhanaCard(type, id);
      return data;
    },
    enabled: !!id,
  });
};
