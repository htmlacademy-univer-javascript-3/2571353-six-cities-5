import {createReducer} from '@reduxjs/toolkit';
import {
  fillOffers,
  setOffersLoadingStatus,
  setNearbyOffers,
  clearNearbyOffers
} from '../action.ts';
import {TPlaceCard} from '../../utils/types.ts';
import {LoadingStatus} from '../../utils/const.ts';

type OffersState = {
  offers: TPlaceCard[];
  nearbyOffers: TPlaceCard[];
  isOffersDataLoading: LoadingStatus;
};

const initialState: OffersState = {
  offers: [],
  nearbyOffers: [],
  isOffersDataLoading: LoadingStatus.Init,
};

const offersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fillOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(clearNearbyOffers, (state) => {
      state.nearbyOffers = [];
      state.isOffersDataLoading = LoadingStatus.Success;
    })
    .addCase(setOffersLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    });
});

export {offersReducer};
