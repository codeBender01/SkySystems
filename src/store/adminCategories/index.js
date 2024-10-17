import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../../api/API";

const initialState = {
  categories: [],
  categoriesCount: 0,
  isCategoriesLoading: false,
  categoriesErrorStatus: "",
};

export const getAllCats = createAsyncThunk(
  "cats/getAll",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.get("/api/category/admin");
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const getOneCat = createAsyncThunk(
  "cats/getOne",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.get(`/api/category/${data}`);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const createCat = createAsyncThunk(
  "cats/create",
  async (data, { rejectWithValue }) => {
    console.log(data);
    try {
      const res = await $api.post("/api/category", data);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const addCategoryOptions = createAsyncThunk(
  "cats/addOption",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.post(
        `/api/category-options/${data.id}`,
        data.option
      );
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const editCategoryOptions = createAsyncThunk(
  "cats/editOption",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.patch(
        `/api/category-options/${data.id}`,
        data.option
      );
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const deleteCategoryOptions = createAsyncThunk(
  "cats/deleteOption",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.delete(`/api/category-options/${data}`);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const deleteCat = createAsyncThunk(
  "cats/delete",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.delete(`/api/category/${data}`);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const updateCatImage = createAsyncThunk(
  "cats/imageUpload",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.post(
        `/api/category/${data.id}/image`,
        data.image,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const deleteCatImage = createAsyncThunk(
  "cats/deletecatImage",
  async (data, { rejectWithValue }) => {
    console.log(data, "dataatat");
    try {
      const res = await $api.delete(`/api/category/image/${data}`);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

const adminCategories = createSlice({
  name: "categories",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllCats.pending, (state, action) => {
        state.isCategoriesLoading = true;
      })
      .addCase(getAllCats.fulfilled, (state, action) => {
        state.isCategoriesLoading = false;
        if (action.payload.categories) {
          state.categories = action.payload.categories;
          state.categoriesCount = action.payload.totalCount;
        }
      })
      .addCase(getAllCats.rejected, (state, action) => {
        state.isCategoriesLoading = false;
        state.categoriesErrorStatus = action.payload;
      });
  },
});

export default adminCategories.reducer;
