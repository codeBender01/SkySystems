import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $clientApi from "../../api/clientApi";
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

const initialState = {
  clientProducts: [],
  isProductsLoading: false,
  clientProductsErrorStatus: "",
};

export const getCLientProducts = createAsyncThunk(
  "clientProducts/getAll",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${baseURL}/api/products/client`);
      console.log(res);
      return res.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response.status);
    }
  }
);

const clientProducts = createSlice({
  name: "clientProducts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCLientProducts.pending, (state, action) => {
        state.isProductsLoading = true;
      })
      .addCase(getCLientProducts.fulfilled, (state, action) => {
        state.isProductsLoading = false;
        if (action.payload.products) {
          state.clientProducts = action.payload.products;
        }
      })
      .addCase(getCLientProducts.rejected, (state, action) => {
        state.isCategoriesLoading = false;
        state.clientProductsErrorStatus = action.payload;
      });
  },
});

export default clientProducts.reducer;
