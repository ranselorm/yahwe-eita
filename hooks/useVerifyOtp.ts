import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const VERIFY_OTP_API_URL =
  "https://yahwe-eita-api-dev.azurewebsites.net/api/otp/verify";

// Hook to verify OTP with pin_id and OTP
export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: async ({ pinId, pin }: { pinId: string; pin: string }) => {
      const response = await axios.post(
        `${VERIFY_OTP_API_URL}?pin_id=${pinId}`,
        { pin },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    },
  });
};
