import {createAction} from '@reduxjs/toolkit';
import {TCity, TPlaceCard, TPlaceCardFull, TReview, TUserFull} from '../utils/types.ts';
import {Actions, LoadingStatus} from '../utils/const.ts';

export const changeCity = createAction<TCity>(`${Actions.City}/change`);

export const setOffers = createAction<TPlaceCard[]>(`${Actions.Offers}/set`);
export const setOffersLoadingStatus = createAction<LoadingStatus>(`${Actions.Offers}/loading`);

export const setNearbyOffers = createAction<TPlaceCard[]>(`${Actions.Offers}/nearby`);
export const clearNearbyOffers = createAction(`${Actions.Offers}/clearNearby`);

export const setOffer = createAction<TPlaceCardFull>(`${Actions.Offer}/set`);
export const clearOffer = createAction(`${Actions.Offer}/clear`);
export const setOfferLoadingStatus = createAction<LoadingStatus>(`${Actions.Offer}/loading`);
export const setActiveOffer = createAction<string | undefined>(`${Actions.Offer}/setActive`);

export const setAuthorizationStatus = createAction<boolean>(`${Actions.User}/authorization`);
export const setUserData = createAction<TUserFull>(`${Actions.User}/setData`);
export const clearUserData = createAction(`${Actions.User}/clear`);

export const setComments = createAction<TReview[]>(`${Actions.Comments}/set`);
export const clearComments = createAction(`${Actions.Comments}/clear`);
export const setCommentsLoadingStatus = createAction<LoadingStatus>(`${Actions.Comments}/loading`);

export const setFavorites = createAction<TPlaceCard[]>(`${Actions.Favorites}/set`);
export const setFavoritesLoadingStatus = createAction<LoadingStatus>(`${Actions.Favorites}/loading`);
