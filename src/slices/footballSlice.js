import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
export const fetchFootballData = createAsyncThunk(
  'football/fetchData',
  async () => {
      const response = await fetch('https://api.example.com/football');
      return response.json();
  }
);

const footballSlice = createSlice({
  name: 'football',
  initialState: { data: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
      builder
          .addCase(fetchFootballData.pending, (state) => { state.status = 'loading'; })
          .addCase(fetchFootballData.fulfilled, (state, action) => {
              state.status = 'succeeded';
              state.data = action.payload;
          })
          .addCase(fetchFootballData.rejected, (state, action) => {
              state.status = 'failed';
              state.error = action.error.message;
          });
  },
});

export default footballSlice.reducer;
