import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../api/API';

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await $api.get(`api/category/category`);
      console.log(response.data);
      return response.data.categories;
    } catch (err) {
      // Use rejectWithValue to return a custom error payload
      return rejectWithValue(err.response ? err.response.data : err.message);
    }
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  }
});

export default categorySlice.reducer;
