// src/hooks/useInvitedUsers.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "https://yahwe-eita-api-dev.azurewebsites.net/api/sponsor";

// Now takes phoneNumber as param
const getSponsor = async (phone: string) => {
  const response = await axios.get(API_URL, {
    // headers: { Authorization: `Bearer ${token}` },
    params: phone ? { phone: phone } : {},
  });
  console.log(response.data?.data);
  return response.data?.data ?? [];
};

// Accepts optional phoneNumber param
export const useSponsor = (phone: string) => {
  return useQuery({
    queryKey: ["getSponsor", phone],
    queryFn: () => getSponsor(phone),
    enabled: !!phone,
  });
};
