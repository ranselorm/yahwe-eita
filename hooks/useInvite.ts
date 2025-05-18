import { RootState } from "@/store/store";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";

interface InvitePayload {
  name: string;
  phone: string;
}

const sendInvite = async (payload: InvitePayload, token: string) => {
  const response = await axios.post(
    "https://yahwe-eita-api-dev.azurewebsites.net/api/invite",
    payload,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const useInvite = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const token = user?.token;

  return useMutation({
    mutationFn: (payload: InvitePayload) => sendInvite(payload, token!),
  });
};
