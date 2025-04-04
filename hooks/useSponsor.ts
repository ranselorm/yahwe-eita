// src/hooks/useInvitedUsers.ts
import { useUser } from "@/context/userContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "https://yahwe-eita-api-dev.azurewebsites.net/api/sponsor";

// Now takes phoneNumber as param
const getSponsor = async (phone: string) => {
  const response = await axios.get(API_URL, {
    // headers: { Authorization: `Bearer ${token}` },
    params: phone ? { phone: phone } : {},
  });
  return response.data?.data ?? [];
};

// Accepts optional phoneNumber param
export const useInvitedUsers = (phone: string) => {
  return useQuery({
    queryKey: ["getSponsor", phone],
    queryFn: () => getSponsor(phone),
    enabled: !!phone,
  });
};
