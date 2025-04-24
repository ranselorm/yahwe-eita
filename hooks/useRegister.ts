import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface UserData {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  ghanaCardNumber: string;
}

const API_URL = "https://yahwe-eita-api.azurewebsites.net/api/register";

export const useRegister = () => {
  return useMutation({
    mutationFn: async (userData: UserData) => {
      const response = await axios.post(API_URL, userData, {
        headers: { "Content-Type": "application/json" },
      });

      return response.data;
    },
  });
};
