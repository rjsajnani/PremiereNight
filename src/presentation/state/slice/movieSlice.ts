import { fetchMovies } from '@application/movies';
import { MoviesList } from '@domain/index';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const loadHomeDashboard = createAsyncThunk(
  'movies/loadHomeDashboard',
  async () => {
    return await fetchMovies();
  },
);

type InitialStateType = {
  nowPlaying: MoviesList;
  popular: MoviesList;
  topRated: MoviesList;
  upcoming: MoviesList;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  paginationStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
};

const initialState: InitialStateType = {
  nowPlaying: { results: [], page: 1, total_pages: 1, total_results: 0 },
  popular: { results: [], page: 1, total_pages: 1, total_results: 0 },
  topRated: { results: [], page: 1, total_pages: 1, total_results: 0 },
  upcoming: { results: [], page: 1, total_pages: 1, total_results: 0 },
  status: 'idle',
  paginationStatus: 'idle',
  error: '',
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadHomeDashboard.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(loadHomeDashboard.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.nowPlaying = action.payload.nowPlaying;
      state.popular = action.payload.popular;
      state.topRated = action.payload.topRated;
      state.upcoming = action.payload.upcoming;
    });
    builder.addCase(loadHomeDashboard.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export default moviesSlice.reducer;
