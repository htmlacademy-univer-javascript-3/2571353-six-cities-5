import {createAction} from '@reduxjs/toolkit';
import {TCity, TPlaceCard, TUserFull} from '../utils/types.ts';
import {Actions} from '../utils/const.ts';

export const changeCity = createAction<TCity>(`${Actions.CITY}/change`);

export const fillOffers = createAction<TPlaceCard[]>(`${Actions.OFFERS}/fill`);
export const setOffersLoadingStatus = createAction<boolean>(`${Actions.OFFERS}/loading`);

export const setAuthorizationStatus = createAction<boolean>(`${Actions.USER}/authorization`);
export const setUserData = createAction<TUserFull | null>(`${Actions.USER}/setData`);
