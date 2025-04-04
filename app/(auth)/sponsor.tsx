// src/screens/InviteScreen.tsx
import React, { useState } from "react";
import { View, TextInput, Button, FlatList, Text } from "react-native";
import { useSponsor } from "@/hooks/useSponsor";

export default function SponsorScreen() {
  const [phone, setPhone] = useState("");
  const [submittedPhone, setSubmittedPhone] = useState<string>("");

  const { data: sponsor, isLoading, isError } = useSponsor(submittedPhone);

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        placeholder="Enter phone number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Button
        title="Search"
        onPress={() => setSubmittedPhone(phone)}
        disabled={!phone}
      />

      {isLoading && <Text>Loading...</Text>}
      {isError && <Text>Error fetching users</Text>}

      <FlatList
        data={sponsor}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text>{JSON.stringify(item)}</Text>}
      />
    </View>
  );
}
