import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const initialState = {
  isUserLoading: false,
  userAuthErrorStatus: "",
  user: {},
};

export const registerUser = createAsyncThunk(
  "userAuth/registerUser",
  async (data, { rejectwithValue }) => {
    try {
      const res = await axios.post("/api/client/auth/registration", data);
      console.log(res);
      return res.data;
    } catch (e) {
      console.log(e);
      return rejectwithValue(e.reesponse.status);
    }
  }
);

export const loginUser = createAsyncThunk(
  "userAuth/loginUser",
  async (data, { rejectwithValue }) => {
    try {
      const res = await axios.post("/api/client/auth/login", data);
      console.log(res);
      return res.data;
    } catch (e) {
      console.log(e);
      return rejectwithValue(e.response.status);
    }
  }
);

export const verifyUser = createAsyncThunk(
  "userAuth/verify",
  async (data, { rejectwithValue }) => {
    try {
      const res = await axios.patch(`/api/client/auth/${data.id}/verify`, {
        verificationCode: data.code,
      });

      return res.data;
    } catch (e) {
      console.log(e);
      return rejectwithValue(e.response.status);
    }
  }
);

const userAuth = createSlice({
  name: "userAuth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isUserLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isUserLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isUserLoading = false;
        state.userAuthErrorStatus = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.isUserLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isUserLoading = false;
        cookies.set("userAccessToken", action.payload.accessToken, {
          path: "/",
        });
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isUserLoading = false;
        state.userAuthErrorStatus = action.payload;
      });
  },
});

export default userAuth.reducer;
