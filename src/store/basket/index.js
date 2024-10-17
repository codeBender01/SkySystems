import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $clientApi from "../../api/clientApi";

const initialState = {
  myBasket: [],
  isBasketLoading: false,
  basketErrorStatus: "",
  basketCount: 0,
};

export const getMyBasket = createAsyncThunk(
  "basket/myBasket",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $clientApi.get(`/api/basket/my-basket`);
      console.log(res);
      return res.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response.status);
    }
  }
);

export const addToBasket = createAsyncThunk(
  "basket/add",
  async (data, { rejectWithValue }) => {
    console.log(data);
    try {
      const res = await $clientApi.post(`/api/basket/add`, data.product);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const deleteFromBasket = createAsyncThunk(
  "basket/delete",
  async (data, { rejectWithValue }) => {
    console.log(data);
    try {
      const res = await $clientApi.delete(`/api/basket/remove/${data}`);
      console.log(res);
      return res.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response.status);
    }
  }
);

const basket = createSlice({
  name: "basket",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getMyBasket.pending, (state, action) => {
        state.isBasketLoading = true;
      })
      .addCase(getMyBasket.fulfilled, (state, action) => {
        state.isBasketLoading = false;
        state.myBasket = action.payload.basket;
        state.basketCount = action.payload.count;
      })
      .addCase(getMyBasket.rejected, (state, action) => {
        state.isBasketLoading = false;
        state.basketErrorStatus = action.payload;
      });
  },
});

export default basket.reducer;
