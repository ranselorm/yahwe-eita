import { ThemeProvider } from "@/context/ThemeProvider";
import "../global.css";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack />
    </ThemeProvider>
  );
}
