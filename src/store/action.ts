import {createAction} from '@reduxjs/toolkit';
import {TCity, TPlaceCard} from '../utils/types.ts';
import {Actions} from '../utils/const.ts';

export const changeCity = createAction<TCity>(`${Actions.CITY}/change`);

export const fillOffers = createAction<TPlaceCard[]>(`${Actions.OFFERS}/fill`);
export const setOffersLoadingStatus = createAction<boolean>(`${Actions.OFFERS}/loading`);
