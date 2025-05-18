import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

const API_URL = "https://yahwe-eita-api.azurewebsites.net/api/verify";

export const useVerifyGhanaCard = (
  id: string,
  token: string,
  options?: UseQueryOptions<any, AxiosError>
) => {
  return useQuery<any, AxiosError>({
    queryKey: ["verify", "ghana_card", id, token],
    queryFn: async () => {
      const { data } = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { type: "ghana_card", id },
      });
      return data;
    },
    enabled: false,
    retry: false,
    ...options,
  });
};
