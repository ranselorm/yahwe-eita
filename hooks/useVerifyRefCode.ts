// hooks/useVerifyRefCode.ts
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "https://yahwe-eita-api-dev.azurewebsites.net/api/otp/send";

// Custom Hook for Reference Code Verification
export const useVerifyRefCode = () => {
  return useMutation({
    mutationFn: async (data: { reference: string }) => {
      console.log(data);
      const response = await axios.post(API_URL, data, {
        headers: { "Content-Type": "application/json" },
      });

      return response.data;
    },
  });
};
