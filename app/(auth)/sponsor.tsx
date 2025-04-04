// src/screens/InviteScreen.tsx
import React, { useState } from "react";
import { View, TextInput, Text, useColorScheme, Pressable } from "react-native";
import { useSponsor } from "@/hooks/useSponsor";

export default function SponsorScreen() {
  const [phone, setPhone] = useState("");
  const [submittedPhone, setSubmittedPhone] = useState<string>("");
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const { data: sponsor, isLoading, isError } = useSponsor(submittedPhone);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  return (
    <View style={{ padding: 16 }}>
      <TextInput
        placeholder="Enter phone number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Pressable
        className={`mt-4 p-3 rounded-xl items-center ${
          isDarkMode ? "bg-white" : "bg-black"
        }`}
        onPress={() => setSubmittedPhone(phone)}
      >
        <Text
          className={`text-lg font-semibold ${
            isDarkMode ? "text-black" : "text-white"
          }`}
        >
          VERIFY SPONSOR
        </Text>
      </Pressable>

      {isLoading && <Text>Loading...</Text>}
      {isError && <Text>Error fetching users</Text>}

      {/* <FlatList
        data={sponsor}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text>{JSON.stringify(item)}</Text>}
      /> */}
      {sponsor ? <Text>{sponsor.email}</Text> : <Text>NO SPONSOR FOUND</Text>}
    </View>
  );
}
