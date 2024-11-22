import { createSlice } from '@reduxjs/toolkit';

const colorSlice = createSlice({
    name: 'color',
    initialState: { primary: '#000000', secondary: '#FFFFFF' },
    reducers: {
        setPrimaryColor: (state, action) => {
            state.primary = action.payload;
        },
        setSecondaryColor: (state, action) => {
            state.secondary = action.payload;
        },
    },
});

export const { setPrimaryColor, setSecondaryColor } = colorSlice.actions;
export default colorSlice.reducer;
