import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../../api/API";

const initialState = {
  abandoned: [],
  clientOrders: [],
  isOrdersLoading: false,
  ordersErrorStatus: "",
};

export const getAbandonedOrders = createAsyncThunk(
  "orders/getAbandonedOrders",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.get("/api/orders/admin/abandoned");
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const getClientOrders = createAsyncThunk(
  "orders/getClientOrders",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.get("/api/orders/admin/clients");
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

const adminOrders = createSlice({
  name: "orders",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAbandonedOrders.pending, (state) => {
        state.isOrdersLoading = true;
      })
      .addCase(getAbandonedOrders.fulfilled, (state, action) => {
        state.isOrdersLoading = false;
        state.abandoned = action.payload;
      })
      .addCase(getAbandonedOrders.rejected, (state, action) => {
        state.isOrdersLoading = false;
        state.ordersErrorStatus = action.payload;
      })
      .addCase(getClientOrders.pending, (state) => {
        state.isOrdersLoading = true;
      })
      .addCase(getClientOrders.fulfilled, (state, action) => {
        state.isOrdersLoading = false;
        state.clientOrders = action.payload;
      })
      .addCase(getClientOrders.rejected, (state, action) => {
        state.isOrdersLoading = false;
        state.ordersErrorStatus = action.payload;
      });
  },
});

export default adminOrders.reducer;
