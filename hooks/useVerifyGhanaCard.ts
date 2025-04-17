import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

const API_URL = "https://yahwe-eita-api.azurewebsites.net/api/verify";

export const useVerifyGhanaCard = (
  id: string,
  options?: UseQueryOptions<any, AxiosError>
) => {
  return useQuery<any, AxiosError>({
    queryKey: ["verify", "ghana_card", id],
    queryFn: () =>
      axios
        .get(API_URL, { params: { type: "ghana_card", id } })
        .then((r) => r.data),
    enabled: false,
    retry: false,
    ...options,
  });
};
