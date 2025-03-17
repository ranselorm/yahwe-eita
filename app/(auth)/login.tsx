import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { useLogin } from "@/hooks/useLogin";
import { useRouter } from "expo-router";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const mutation = useLogin();

  const handleLogin = () => {
    mutation.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          console.log("Login successful!", data);
          router.replace("/(tabs)");
        },
        onError: (error) => {
          console.error("Login failed:", error.message);
        },
      }
    );
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title="Login"
        onPress={handleLogin}
        disabled={mutation.isPending}
      />
      {mutation.isError && <Text style={{ color: "red" }}>Login failed</Text>}
    </View>
  );
};

export default LoginScreen;
