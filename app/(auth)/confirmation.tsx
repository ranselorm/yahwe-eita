import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import React from "react";

export default function ConfirmationScreen() {
  const { sponsor } = useLocalSearchParams();
  console.log(sponsor);
  return (
    <View>
      <Text>confirmation</Text>
    </View>
  );
}
