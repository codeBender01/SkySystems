import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../../api/API";

const initialState = {
  admins: [],
  isAdminsLoading: false,
  adminsErrorStatus: "",
};

export const getAllAdmins = createAsyncThunk(
  "admins/getAll",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.get("/api/admin/users");
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const createAdmin = createAsyncThunk(
  "admins/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.post("/api/admin/users", data);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const editAdmin = createAsyncThunk(
  "admins/edit",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.patch(`/api/admin/users/${data.id}`, data.admin);
      console.log(res);
      return res.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response.status);
    }
  }
);

export const deleteAdmin = createAsyncThunk(
  "admins/delete",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.delete(`/api/admin/users/${data}`);
      console.log(res);
      return res.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response.status);
    }
  }
);

const admins = createSlice({
  name: "admins",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllAdmins.pending, (state) => {
        state.isAdminsLoading = false;
      })
      .addCase(getAllAdmins.fulfilled, (state, action) => {
        state.isAdminsLoading = true;
        state.admins = action.payload.admins;
      })
      .addCase(getAllAdmins.rejected, (state, action) => {
        state.isAdminsLoading = false;
        state.adminsErrorStatus = action.payload;
      });
  },
});

export default admins.reducer;
