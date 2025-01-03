import {createReducer} from '@reduxjs/toolkit';
import {setOffer, clearOffer, setOfferLoadingStatus, setActiveOffer} from '../action.ts';
import {TPlaceCardFull} from '../../utils/types.ts';
import {LoadingStatus} from '../../utils/const.ts';

type OfferState = {
  offer?: TPlaceCardFull;
  isOfferDataLoading: LoadingStatus;
  activeOffer?: string;
};

const initialState: OfferState = {
  offer: undefined,
  isOfferDataLoading: LoadingStatus.Init
};

const offerReducer = createReducer(initialState, (builder) => {
  builder
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
    .addCase(setActiveOffer, (state, action) => {
      state.activeOffer = action.payload;
    });
});

export {offerReducer};
