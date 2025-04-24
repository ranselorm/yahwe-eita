import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface UserData {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  ghanaCardNumber: string;
  dateOfBirth: string;
}

const API_URL = "https://yahwe-eita-api.azurewebsites.net/api/register";

export const useRegister = (token: string) => {
  console.log(token, "IN HOOK TOKEN");
  return useMutation({
    mutationFn: async (userData: UserData) => {
      const response = await axios.post(API_URL, userData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
  });
};
