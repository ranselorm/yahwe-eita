import { useUser } from "@/context/userContext";
import { RootState } from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";

const API_URL = `https://yahwe-eita-api.azurewebsites.net/api/transactions/mobile`;

const fetchTransactions = async (
  token: string
  //   page: number,
  //   page_size: number
) => {
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
    // params: {
    //   page,
    //   page_size,
    // },
  });
  const transactions = response?.data?.data?.transactions ?? [];
  const count = response?.data?.data?.count ?? 0;
  return { transactions, count };
};

export const useTransactions = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const token = user?.token;

  return useQuery({
    queryKey: ["transactions", token],
    queryFn: async () => {
      const { transactions, count } = await fetchTransactions(
        token!
        // page,
        // limit
      );
      return { transactions };
    },
    enabled: !!token,
  });
};
