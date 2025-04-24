import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export interface PasswordData {
  email: string;
}

const API_URL = "https://yahwe-eita-api.azurewebsites.net/api/reset-password";

export const useResetPassword = () => {
  return useMutation<any, AxiosError, PasswordData>({
    mutationFn: async (payload: PasswordData) => {
      const url = `${API_URL}`;
      const { data } = await axios.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return data;
    },
  });
};
