import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "https://yahwe-eita-api-dev.azurewebsites.net/api/register";

// Simple mutation hook for user registration
export const useRegister = () => {
  return useMutation({
    mutationFn: async (userData: {
      fullName: string;
      email: string;
      password: string;
      phone: string;
      ghanaCardNumber: string;
    }) => {
      const response = await axios.post(API_URL, userData, {
        headers: { "Content-Type": "application/json" },
      });

      return response.data;
    },
  });
};
