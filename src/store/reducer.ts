import {createReducer} from '@reduxjs/toolkit';
import {
  changeCity, clearComments, clearOffer, clearNearbyOffers, clearUserData,
  fillOffers,
  setAuthorizationStatus,
  setComments, setCommentsLoadingStatus, setNearbyOffers,
  setOffer,
  setOfferLoadingStatus,
  setOffersLoadingStatus,
  setUserData
} from './action.ts';
import {CITIES, LoadingStatus} from '../utils/const.ts';
import {TCity, TPlaceCard, TPlaceCardFull, TReview, TUserFull} from '../utils/types.ts';

type InitialState = {
  authorizationStatus: boolean;
  userData?: TUserFull;
  city: TCity;
  offers: TPlaceCard[];
  offer?: TPlaceCardFull;
  nearbyOffers: TPlaceCard[];
  comments: TReview[];
  isOffersDataLoading: LoadingStatus;
  isOfferDataLoading: LoadingStatus;
  isCommentsDataLoading: LoadingStatus;
};

const initialState:InitialState = {
  authorizationStatus: false,
  city: CITIES.Paris,
  offers: [],
  nearbyOffers: [],
  comments: [],
  isOffersDataLoading: LoadingStatus.Init,
  isOfferDataLoading: LoadingStatus.Init,
  isCommentsDataLoading: LoadingStatus.Init
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(clearNearbyOffers, (state) => {
      state.nearbyOffers = [];
      state.isOffersDataLoading = LoadingStatus.Init;
    })
    .addCase(setOffersLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })

    .addCase(setNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })

    .addCase(setOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(clearOffer, (state) => {
      state.offer = undefined;
      state.isOfferDataLoading = LoadingStatus.Init;
    })
    .addCase(setOfferLoadingStatus, (state, action) => {
      state.isOfferDataLoading = action.payload;
    })

    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    })
    .addCase(clearUserData, (state) => {
      state.userData = undefined;
    })

    .addCase(setComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(clearComments, (state) => {
      state.comments = [];
      state.isCommentsDataLoading = LoadingStatus.Init;
    })
    .addCase(setCommentsLoadingStatus, (state, action) => {
      state.isCommentsDataLoading = action.payload;
    });
});

export {reducer};
