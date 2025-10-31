import { configureStore } from '@reduxjs/toolkit';
import { movieReducer, wishlistReducer } from './slice';
export const store = configureStore({
  reducer: {
    movies: movieReducer,
    wishlist: wishlistReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
