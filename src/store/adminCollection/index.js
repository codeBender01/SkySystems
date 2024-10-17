import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../../api/API";

const initialState = {
  collections: [],
  collectionsCount: null,
  isCollectionsLoading: false,
  collectionsErrorStatus: "",
};

export const getAllCollections = createAsyncThunk(
  "collections/getAll",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.get("/api/collection/admin");
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const getOneCollection = createAsyncThunk(
  "collections/getOne",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.get(`/api/collection/admin/${data}`);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const createCollection = createAsyncThunk(
  "collections/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.post("/api/collection", data);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const addCollectionOption = createAsyncThunk(
  "collections/addOption",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.post(
        `/api/collection-options/${data.id}`,
        data.option
      );
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const editCollectionOption = createAsyncThunk(
  "collections/editOption",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.patch(
        `/api/collection-options/${data.id}`,
        data.option
      );
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const deleteCollectionOption = createAsyncThunk(
  "collections/deleteOption",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.delete(`/api/collection-options/${data}`);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const deleteCollection = createAsyncThunk(
  "collections/delete",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.delete(`/api/collection/${data}`);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

export const updateColImage = createAsyncThunk(
  "collection/imageUpload",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.post(
        `/api/collection/${data.id}/image`,
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

export const deleteColImage = createAsyncThunk(
  "collections/deletecatImage",
  async (data, { rejectWithValue }) => {
    try {
      const res = await $api.delete(`/api/collection/image/${data}`);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.status);
    }
  }
);

const adminCollections = createSlice({
  name: "collection",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllCollections.pending, (state, action) => {
        state.isCollectionsLoading = true;
      })
      .addCase(getAllCollections.fulfilled, (state, action) => {
        state.isCollectionsLoading = false;
        if (action.payload.collections) {
          state.collections = action.payload.collections;
          state.collectionsCount = action.payload.totalCount;
        }
      })
      .addCase(getAllCollections.rejected, (state, action) => {
        state.isCollectionsLoading = false;
        state.collectionsErrorStatus = action.payload;
      });
  },
});

export default adminCollections.reducer;
