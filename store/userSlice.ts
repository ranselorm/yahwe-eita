import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: number;
  isLoggedIn: boolean;
  name: string;
  email: string;
  picture: string;
  token: string;
  idToken: string;
}

interface UserState {
  user: User | null;
  sponsorId: number;
  accessToken: string;
  globalEmail: string;
  globalPassword: string;
}

const initialState: UserState = {
  user: null,
  sponsorId: 0,
  accessToken: "",
  globalEmail: "",
  globalPassword: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
      state.accessToken = "";
    },
    setSponsorId(state, action: PayloadAction<number>) {
      state.sponsorId = action.payload;
    },
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
    setGlobalEmail(state, action: PayloadAction<string>) {
      state.globalEmail = action.payload;
    },
    setGlobalPassword(state, action: PayloadAction<string>) {
      state.globalPassword = action.payload;
    },
  },
});

export const {
  setUser,
  logout,
  setSponsorId,
  setAccessToken,
  setGlobalEmail,
  setGlobalPassword,
} = userSlice.actions;

export default userSlice.reducer;
