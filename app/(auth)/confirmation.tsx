import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import React from "react";

export default function ConfirmationScreen() {
  const { sponsor } = useLocalSearchParams();
  const sponsorData = sponsor ? JSON.parse(sponsor as string) : null;
  console.log(sponsorData);
  return (
    <View>
      <Text>confirmation</Text>
    </View>
  );
}
