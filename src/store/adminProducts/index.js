import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../../api/API";

const initialState = {
  products: [],
  productsCount: null,
  isProductsLoading: false,
  productsErrorStatus: "",
};

export const getAllProducts = createAsyncThunk(
  "products/getAll",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.get("/api/products/admin");
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.post("/api/products", data);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.delete(`/api/products/${data}`);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const addProductOption = createAsyncThunk(
  "products/addOption",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.post(
        `/api/product-options/${data.id}`,
        data.option
      );
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const editProductOption = createAsyncThunk(
  "products/editOption",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.patch(
        `/api/product-options/${data.id}`,
        data.option
      );
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const deleteProductOption = createAsyncThunk(
  "products/deleteOption",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.delete(`/api/product-options/${data}`);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const addProductColor = createAsyncThunk(
  "products/addColor",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.post(`/api/product-colors/${data.id}`, data.color);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const addProductColorOption = createAsyncThunk(
  "products/addColorOption",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.post(
        `/api/product-colors/${data.id}/options`,
        data.option
      );
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const editProductColorOption = createAsyncThunk(
  "products/editColorOption",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.patch(
        `/api/product-colors/${data.id}/options`,
        data.option
      );
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const deleteProductColorOption = createAsyncThunk(
  "products/deleteColorOption",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.delete(`/api/product-colors/${data}/options`);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const deleteProductColor = createAsyncThunk(
  "products/deleteProductColor",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.delete(`/api/product-colors/${data}`);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const addProductSize = createAsyncThunk(
  "products/addSize",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.post(
        `/api/product-colors/${data.id}/size`,
        data.size
      );
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const editProductSize = createAsyncThunk(
  "products/editSize",
  async (data, { rejectWithValue }) => {
    console.log(data);
    try {
      const res = await $api.patch(
        `/api/product-colors/size/${data.id}`,
        data.size
      );
      return res.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response.status);
    }
  }
);

export const deleteProductSize = createAsyncThunk(
  "products/deleteSize",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.delete(`/api/product-colors/size/${data}`);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const addProductSizeImage = createAsyncThunk(
  "products/addImage",
  async (data, { rejectWithValue }) => {
    console.log(data);
    try {
      const res = await $api.post(
        `/api/product-colors/size/${data.id}/image`,
        data.image
      );
      console.log(res);
      return res.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response.status);
    }
  }
);

export const deleteProductSizeImage = createAsyncThunk(
  "products/deleteImage",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.delete(`/api/product-colors/size/image/${data}`);
      console.log(res);
      return res.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response.status);
    }
  }
);

const adminProducts = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state, action) => {
        state.isProductsLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isProductsLoading = false;
        if (action.payload.products) {
          state.products = action.payload.products;
          state.productsCount = action.payload.totalCount;
        }
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isCategoriesLoading = false;
        state.categoriesErrorStatus = action.payload;
      });
  },
});

export default adminProducts.reducer;
