import { MovieResult } from '@domain/model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@state/store';

type InitialStateType = {
  items: MovieResult[];
};

const initialState: InitialStateType = {
  items: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist: (state, action: PayloadAction<MovieResult>) => {
      const index = state.items.findIndex(
        item => item.id === action.payload.id,
      );
      if (index !== -1) {
        state.items.splice(index, 1);
      } else {
        state.items.push(action.payload);
      }
    },
  },
});

export const { toggleWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;

export const selectWishlistItems = (state: { wishlist: InitialStateType }) =>
  state.wishlist.items;

export const selectIsInWishlist = (state: RootState, movieId: number) =>
  state.wishlist.items.some(item => item.id === movieId);

export const selectWishlistCount = (state: { wishlist: InitialStateType }) =>
  state.wishlist.items.length;
