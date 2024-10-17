import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $clientApi from "../../api/clientApi";
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  clientCategories: [],
  isCategoriesLoading: false,
  clientCategoriesErrorStatus: "",
};

export const getClientCategories = createAsyncThunk(
  "clientProducts/getAll",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${baseURL}/api/category/client`);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

const clientCategories = createSlice({
  name: "clientCategories",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getClientCategories.pending, (state, action) => {
        state.isCategoriesLoading = true;
      })
      .addCase(getClientCategories.fulfilled, (state, action) => {
        state.isCategoriesLoading = false;
        if (action.payload.categories) {
          state.clientCategories = action.payload.categories;
        }
      })
      .addCase(getClientCategories.rejected, (state, action) => {
        state.isCategoriesLoading = false;
        state.clientCategoriesErrorStatus = action.payload;
      });
  },
});

export default clientCategories.reducer;
