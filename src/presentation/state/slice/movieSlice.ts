import { fetchMovieByCategory, fetchMovies } from '@application/movies';
import { MOVIE_CATEGORY_CONFIG, MovieCategory } from '@constants/constants';
import { MoviesList } from '@domain/index';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const loadHomeDashboard = createAsyncThunk(
  'movies/loadHomeDashboard',
  async () => {
    return await fetchMovies();
  },
);

export const loadMoreMovies = createAsyncThunk(
  'movies/loadMoreMovies',
  async (
    {
      categoryKey,
      page,
    }: {
      categoryKey: MovieCategory['key'];
      page: number;
    },
    { rejectWithValue },
  ) => {
    try {
      const endpoint = MOVIE_CATEGORY_CONFIG[categoryKey].endpoint;
      const response = await fetchMovieByCategory(endpoint, page);

      return {
        categoryKey,
        data: response as MoviesList,
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
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
    builder.addCase(loadMoreMovies.pending, state => {
      state.paginationStatus = 'loading';
    });
    builder.addCase(loadMoreMovies.fulfilled, (state, action) => {
      state.paginationStatus = 'succeeded';
      const { categoryKey, data } = action.payload;
      state[categoryKey] = {
        results: [...state[categoryKey].results, ...data.results],
        page: data.page,
        total_pages: data.total_pages,
        total_results: data.total_results,
      };
    });
    builder.addCase(loadMoreMovies.rejected, (state, action) => {
      state.paginationStatus = 'failed';
      state.error = action.error.message;
    });
  },
});

export default moviesSlice.reducer;
