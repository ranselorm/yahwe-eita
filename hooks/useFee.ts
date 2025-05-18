// hooks/useRegister.ts
import { useUser } from "@/context/userContext";
import { RootState } from "@/store/store";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useSelector } from "react-redux";

export interface FeeData {
  phone: string;
  customerName: string;
  customerEmail: string;
  channel: string;
}

const API_URL = "https://yahwe-eita-api.azurewebsites.net/api/fee";

export const useFee = () => {
  const { accessToken } = useSelector((state: RootState) => state.user);
  return useMutation<any, AxiosError, FeeData>({
    mutationFn: async (feeData: FeeData) => {
      const url = `${API_URL}`;
      const { data } = await axios.post(url, feeData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return data;
    },
  });
};
