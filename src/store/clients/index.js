import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../../api/API";

const initialState = {
  clients: [],
  isClientsLoading: false,
  clientsErrorStatus: "",
};

export const getAllClients = createAsyncThunk(
  "clients/getAll",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.get("/api/client/users");
      console.log(res);
      return res.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response.status);
    }
  }
);

const clients = createSlice({
  name: "clients",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllClients.pending, (state) => {
        state.isClientsLoading = true;
      })
      .addCase(getAllClients.fulfilled, (state, action) => {
        state.isClientsLoading = false;
        state.clients = action.payload.clients;
      })
      .addCase(getAllClients.rejected, (state, action) => {
        state.isClientsLoading = false;
        state.clientsErrorStatus = action.payload;
      });
  },
});

export default clients.reducer;
