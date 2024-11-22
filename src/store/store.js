import { configureStore } from '@reduxjs/toolkit';
import slidersReducer from './slices/slidersSlice';

const store = configureStore({
  reducer: {
    sliders: slidersReducer, // Use the key 'sliders' instead of 'webSlider'
  },
});

export default store;
