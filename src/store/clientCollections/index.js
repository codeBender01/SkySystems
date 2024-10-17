import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $clientApi from "../../api/clientApi";
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  clientCollections: [],
  isCollectionsLoading: false,
  clientCollectionsErrorStatus: "",
};

export const getClientCollections = createAsyncThunk(
  "clientProducts/getAll",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${baseURL}/api/collection/client`);
      console.log(res);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

const clientCollection = createSlice({
  name: "clientCollection",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getClientCollections.pending, (state, action) => {
        state.isCollectionsLoading = true;
      })
      .addCase(getClientCollections.fulfilled, (state, action) => {
        state.isCollectionsLoading = false;
        if (action.payload.collections) {
          state.clientCollections = action.payload.collections;
        }
      })
      .addCase(getClientCollections.rejected, (state, action) => {
        state.isCollectionsLoading = false;
        state.clientCollectionsErrorStatus = action.payload;
      });
  },
});

export default clientCollection.reducer;
