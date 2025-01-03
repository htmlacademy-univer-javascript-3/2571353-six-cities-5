import {createReducer} from '@reduxjs/toolkit';
import {changeCity} from '../action.ts';
import {CITIES} from '../../utils/const.ts';
import {TCity} from '../../utils/types.ts';


type CityState = {
  city: TCity;
};

const initialState: CityState = {
  city: CITIES.Paris,
};

const cityReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    });
});

export {cityReducer};
