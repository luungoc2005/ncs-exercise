
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
    sortBy: "year_desc",
    filter: "movie",
    searchQuery: "",
  },
  reducers: {
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    }
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

export const { 
  setSortBy,
  setFilter,
  setSearchQuery,
} = homeSlice.actions;

export const selectTitles = createSelector(
  state => state.home.entries,
  state => state.home.searchQuery,
  state => state.home.sortBy,
  state => state.home.filter,
  (entries, searchQuery, sortBy, filter) => {
    const regex = new RegExp(searchQuery, 'gi');

    let result = searchQuery && searchQuery.length > 3
      ? entries.filter(item => regex.test(item.title))
      : entries.slice()

    result = result.filter(item => item.programType === filter)

    let compareFunction;
    switch (sortBy) {
      case "year_desc":
        compareFunction = (a, b) => b.releaseYear - a.releaseYear;
        break;
      case "year_asc":
        compareFunction = (a, b) => a.releaseYear - b.releaseYear;
        break;
      case "title_asc":
        compareFunction = (a, b) => 
          a.title < b.title
            ? -1
            : a.title > b.title
              ? 1
              : 0
        break;
      case "title_desc":
        compareFunction = (a, b) => 
          a.title > b.title
            ? -1
            : a.title < b.title
              ? 1
              : 0
        break;
    }

    result.sort(compareFunction);

    return result;
  }
)

export default homeSlice.reducer;

