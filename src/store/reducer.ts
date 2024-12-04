import {createReducer} from '@reduxjs/toolkit';
import {setCity, setOffers} from './action.ts';
import {offersMock} from '../mocks/offersMock.ts';
import {CITIES} from '../utils/const.ts';

const initialState = {
  city: CITIES.Paris,
  offers: offersMock.filter((o) => o.city.name === 'Paris'),
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      const {city} = action.payload;
      state.city = city;
    })
    .addCase(setOffers, (state, action) => {
      const {offers} = action.payload;

      state.offers = offers;
    });
});

export {reducer};
