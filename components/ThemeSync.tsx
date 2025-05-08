// src/components/ThemeSync.tsx
import { useEffect } from "react";
import { Appearance } from "react-native";
import { useDispatch } from "react-redux";
import { setTheme } from "@/store/themeSlice";

export default function ThemeSync() {
  const dispatch = useDispatch();

  useEffect(() => {
    const colorScheme = Appearance.getColorScheme();
    if (colorScheme) {
      dispatch(setTheme(colorScheme));
    }

    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      if (colorScheme) dispatch(setTheme(colorScheme));
    });

    return () => listener.remove();
  }, [dispatch]);

  return null;
}
