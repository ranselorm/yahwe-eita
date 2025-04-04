import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const VERIFY_SPONSOR =
  "https://yahwe-eita-api-dev.azurewebsites.net/api/sponsor";

export const useSponsor = () => {
  return useMutation({
    mutationFn: async ({ phone }: { phone: string }) => {
      const response = await axios.post(`${VERIFY_SPONSOR}?pHONE=${phone}`, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    },
  });
};
