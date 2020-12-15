
import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { testApis } from 'apis';

export const fetchFeed = createAsyncThunk(
  'users/fetchFeed',
  async () => {
    const response = await testApis.get();
    return await response; //.json();
  }
)


export const homeSlice = createSlice({
  name: 'home',
  initialState: {
    total: 0,
    entries: [],
    fetching: false,
    error: null,
  },
  extraReducers: {
    [fetchFeed.pending]: (state) => {
      state.fetching = true;
      state.error = null;
    },
    [fetchFeed.fulfilled]: (state, action) => {
      state.fetching = false;
      state.error = null;
      state.total = action.payload.total;
      state.entries = action.payload.entries;
    },
    [fetchFeed.rejected]: (state, action) => {
      state.fetching = false;
      state.error = action.payload;
    }
  }
});

export default homeSlice.reducer;

