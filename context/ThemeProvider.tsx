import React, { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import { useColorScheme as nativewindColorScheme } from "nativewind";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemColorScheme = useColorScheme(); // Detect system light/dark mode
  const { setColorScheme } = nativewindColorScheme();
  const [theme, setTheme] = useState<Theme>(systemColorScheme || "light");

  useEffect(() => {
    setColorScheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
