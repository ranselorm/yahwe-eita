// hooks/useVerify.ts
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

const API_URL = "https://yahwe-eita-api.azurewebsites.net/api/verify";

export type VerifyType = "phone" | "momo" | "ghana_card";

export interface VerifyParams {
  type: VerifyType;
  id: string;
  provider?: string;
}

export const useVerify = (
  params: VerifyParams,
  token: string,
  options?: UseQueryOptions<any, AxiosError>
) => {
  const { type, id, provider } = params;

  return useQuery<any, AxiosError>({
    queryKey: ["verify", type, id, provider, token],
    queryFn: async () => {
      const { data } = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { type, id, provider },
      });
      return data;
    },
    enabled: false,
    ...options,
  });
};
