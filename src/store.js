import { configureStore } from '@reduxjs/toolkit';
import { homeSlice } from 'pages/HomePage/slice';

export const store = configureStore({
  reducer: {
    home: homeSlice.reducer,
  }
})

export default store;