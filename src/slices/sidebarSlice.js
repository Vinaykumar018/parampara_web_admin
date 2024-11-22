// src/slices/sidebarSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarShow: true,
  theme: 'light',
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarShow = !state.sidebarShow;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { toggleSidebar, setTheme } = sidebarSlice.actions;
export default sidebarSlice.reducer;
