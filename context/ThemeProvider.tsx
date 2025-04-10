import React, { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native"; // Use react-native's useColorScheme

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemColorScheme = useColorScheme(); // Use react-native's useColorScheme
  const [theme, setTheme] = useState<Theme>(systemColorScheme || "light");

  useEffect(() => {
    // If the theme is set manually, use that; otherwise, follow system color scheme
    if (systemColorScheme) {
      setTheme(systemColorScheme);
    }
  }, [systemColorScheme]);

  useEffect(() => {
    // This effect will update the theme
    // You can add logic here to reflect the theme on your app, e.g., via nativewind or manual styling
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
