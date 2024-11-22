
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
export const fetchHockeyData = createAsyncThunk(
  'hockey/fetchData',
  async () => {
      const response = await fetch('https://api.example.com/hockey');
      return response.json();
  }
);

const hockeySlice = createSlice({
  name: 'hockey',
  initialState: { data: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
      builder
          .addCase(fetchHockeyData.pending, (state) => { state.status = 'loading'; })
          .addCase(fetchHockeyData.fulfilled, (state, action) => {
              state.status = 'succeeded';
              state.data = action.payload;
          })
          .addCase(fetchHockeyData.rejected, (state, action) => {
              state.status = 'failed';
              state.error = action.error.message;
          });
  },
});

export default hockeySlice.reducer;
