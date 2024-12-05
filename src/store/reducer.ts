import {createReducer} from '@reduxjs/toolkit';
import {changeCity, fillOffers, setUserData, setOffersLoadingStatus, setAuthorizationStatus} from './action.ts';
import {CITIES} from '../utils/const.ts';
import {TCity, TPlaceCard, TUserFull} from '../utils/types.ts';

type InitialState = {
  authorizationStatus: boolean;
  userData: TUserFull | null;
  city: TCity;
  offers: TPlaceCard[];
  isOffersDataLoading: boolean;
};

const initialState:InitialState = {
  authorizationStatus: false,
  userData: null,
  city: CITIES.Paris,
  offers: [],
  isOffersDataLoading: false
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    });
});

export {reducer};
