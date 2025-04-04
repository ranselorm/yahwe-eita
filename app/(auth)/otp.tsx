import { useEffect } from "react";
import { Alert, Text, View } from "react-native";

export default function OTPScreen() {
  useEffect(() => {
    Alert.alert("OTP Screen", "This is the OTP screen");
  }, []);

  return (
    <View>
      <Text>OTPScreen</Text>
    </View>
  );
}
