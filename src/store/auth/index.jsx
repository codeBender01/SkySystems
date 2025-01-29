import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const initialState = {
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
      cookies.set("adminAccessToken", action.payload);
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
      cookies.set("adminRefreshToken", action.payload);
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      cookies.set("adminAccessToken");
      cookies.set("adminRefreshToken");
      window.location.replace("/admin/login");
    },
  },
});

export const { setAccessToken, setRefreshToken, logout } = authSlice.actions;
export default authSlice.reducer;
