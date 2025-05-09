import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
}

const initialState: ThemeState = {
  theme: "light", // fallback, will be overridden on app start
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
