import {createAction} from '@reduxjs/toolkit';
import {TCity, TPlaceCard} from '../utils/types.ts';

export const setCity = createAction<{city: TCity}>('setCity');
export const setOffers = createAction<{offers: TPlaceCard[]}>('setOffers');
