// hooks/useVerifyRefCode.ts
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "https://yahwe-eita-api.azurewebsites.net/api/otp/send";

export const useSendOtp = () => {
  return useMutation({
    mutationFn: async (data: { phone: string }) => {
      const response = await axios.post(API_URL, data, {
        headers: { "Content-Type": "application/json" },
      });
      return response;
    },
  });
};
