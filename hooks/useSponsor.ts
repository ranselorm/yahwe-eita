import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios from "axios";

export const useSponsor = (
  phone: string,
  options?: UseQueryOptions<any, Error>
) => {
  return useQuery({
    queryKey: ["sponsor", phone],
    queryFn: async () => {
      const response = await axios.get(
        `https://yahwe-eita-api.azurewebsites.net/api/sponsor`,
        {
          params: { phone },
        }
      );
      return response.data;
    },
    enabled: !!phone,
    ...options,
  });
};
