import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import $api from '../../api/API'

export const fetchcategoryProducts = createAsyncThunk(
  'categoryProducts/fetchcategoryProducts',
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await $api.get(`api/category/category/${categoryId}`);
      console.log('API Response:', response.data);
      return response.data.products; // API'den dönen verinin doğru olup olmadığını kontrol edin
    } catch (error) {
      console.error('Error fetching category products:', error);
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

const categoryProductsSlice = createSlice({
  name: 'categoryProducts',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchcategoryProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchcategoryProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchcategoryProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export default categoryProductsSlice.reducer;
