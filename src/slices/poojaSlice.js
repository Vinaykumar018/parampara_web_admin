import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching Pooja data
export const fetchPoojaData = createAsyncThunk(
  'pooja/fetchPoojaData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://34.131.70.24:3000/api/pooja/all-pooja", {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8`,
        },
      });
      if (response.data.status === 1) {
        return response.data.data;
      } else {
        return rejectWithValue("Failed to fetch data");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const poojaSlice = createSlice({
  name: 'pooja',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPoojaData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPoojaData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPoojaData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default poojaSlice.reducer;
