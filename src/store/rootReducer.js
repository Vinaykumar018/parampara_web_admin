import { combineReducers } from 'redux';
import { legacy_createStore as createStore } from 'redux';
import cricketReducer from '../slices/cricketSlice';
import hockeyReducer from '../slices/hockeySlice';
import footballReducer from '../slices/footballSlice';
import colorReducer from '../slices/colorSlice';
import authReducer from '../slices/authSlice';
import userReducer from '../slices/userSlice'; // Adjust path as necessary
import sidebarReducer from '../slices/sidebarSlice';

// Legacy reducer
const initialState = {
  sidebarShow: true,
  theme: 'light',
};

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest };
    default:
      return state;
  }
};

// Combine reducers
const rootReducer = combineReducers({
  legacy: changeState, // Legacy reducer
  cricket: cricketReducer,
  hockey: hockeyReducer,
  football: footballReducer,
  color: colorReducer,
  auth: authReducer,
  users: userReducer,
  sidebar: sidebarReducer,
});

// Create a single store using Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: rootReducer,
});

export default store;