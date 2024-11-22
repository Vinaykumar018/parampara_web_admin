import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCricketData = createAsyncThunk(
    'cricket/fetchData',
    async () => {
        const response = await fetch('https://api.example.com/cricket');
        return response.json();
    }
);

const cricketSlice = createSlice({
    name: 'cricket',
    initialState: { data: [], status: 'idle', error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCricketData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCricketData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchCricketData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default cricketSlice.reducer;
