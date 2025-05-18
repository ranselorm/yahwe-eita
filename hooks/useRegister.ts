// hooks/useRegister.ts
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export interface UserData {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  ghanaCardNumber: string;
  dateOfBirth: string;
}

const API_URL = "https://yahwe-eita-api.azurewebsites.net/api/register";

export const useRegister = (token: string, validateOnly = false) => {
  return useMutation<any, AxiosError, UserData>({
    mutationFn: async (userData: UserData) => {
      // append ?validate_only=true|false
      const url = `${API_URL}?validate_only=${validateOnly}`;
      const { data } = await axios.post(url, userData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
  });
};
