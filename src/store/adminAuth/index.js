import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../../api/API";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  admin: {},
  isAdminLoading: false,
  adminErrorStatus: "",
};

export const adminLogin = createAsyncThunk(
  "admin/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${baseURL}/api/admin/auth/login`, data);
      console.log(res);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const adminLogout = createAsyncThunk(
  "admin/logout",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.post("/api/admin/auth/logout");
      console.log(res);
      return res.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response.status);
    }
  }
);

const adminAuth = createSlice({
  name: "adminAuth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.isAdminLoading = true;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.isAdminLoading = false;
        cookies.set("adminAccessToken", action.payload.accessToken, {
          path: "/",
        });
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.isAdminLoading = false;
        state.adminErrorStatus = action.payload;
      });
  },
});

export default adminAuth.reducer;
