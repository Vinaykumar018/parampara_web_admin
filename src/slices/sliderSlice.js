import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// API URL
const apiUrl = "https://parampara-admin.vercel.app/api/Slider";

// Fetch categories (Thunk)
export const fetchCategories = createAsyncThunk('slider/fetchCategories', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${apiUrl}/all-category`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8`,
      },
    });
    const result = await response.json();
    if (result.status === 1) {
      return result.data;
    } else {
      return rejectWithValue('Failed to fetch categories');
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const sliderSlice = createSlice({
  name: 'slider',
  initialState: {
    categoryData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryData = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default sliderSlice.reducer;
