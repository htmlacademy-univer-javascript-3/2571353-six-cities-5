import {createReducer} from '@reduxjs/toolkit';
import {TPlaceCard} from '../../utils/types.ts';
import {LoadingStatus} from '../../utils/const.ts';
import {setFavorites, setFavoritesLoadingStatus} from '../action.ts';

type FavoritesState = {
  favorites: TPlaceCard[];
  isFavoritesDataLoading: LoadingStatus;
};

const initialState: FavoritesState = {
  favorites: [],
  isFavoritesDataLoading: LoadingStatus.Init,
};

const favoritesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setFavorites, (state, action) => {
      state.favorites = action.payload;
    })
    .addCase(setFavoritesLoadingStatus, (state, action) => {
      state.isFavoritesDataLoading = action.payload;
    });
});

export {favoritesReducer};
