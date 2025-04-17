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
  options?: UseQueryOptions<any, AxiosError>
) => {
  const { type, id, provider } = params;

  return useQuery<any, AxiosError>({
    queryKey: ["verify", type, id, provider],
    queryFn: async () => {
      const { data } = await axios.get(API_URL, {
        params: { type, id, provider },
      });
      return data;
    },
    // don’t fire until the component wants to
    enabled: false,
    ...options,
  });
};
