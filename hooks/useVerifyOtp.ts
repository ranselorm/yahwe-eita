import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const VERIFY_OTP_API_URL =
  "https://yahwe-eita-api-dev.azurewebsites.net/api/otp/verify";

// Hook to verify OTP with pin_id and OTP
export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: async ({ pinId, otp }: { pinId: string; otp: string }) => {
      const response = await axios.post(
        `${VERIFY_OTP_API_URL}?pin_id=${pinId}`,
        { otp }, // Send OTP in the request body
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    },
  });
};
