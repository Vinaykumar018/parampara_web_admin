import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8';

// Async action to fetch sliders
export const fetchSliders = createAsyncThunk('sliders/fetchSliders', async () => {
  const response = await fetch('https://parampara-admin.vercel.app/api/slider/all-slider', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch sliders');
  }
  return await response.json();
});

const slidersSlice = createSlice({
  name: 'sliders', // Change the slice name to 'sliders'
  initialState: {
    sliders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSliders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSliders.fulfilled, (state, action) => {
        state.loading = false;
        state.sliders = action.payload;
      })
      .addCase(fetchSliders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default slidersSlice.reducer;
