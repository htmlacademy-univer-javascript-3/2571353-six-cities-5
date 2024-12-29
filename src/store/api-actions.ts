import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {StatusCodes} from 'http-status-codes';
import {
  clearUserData,
  fillOffers,
  setAuthorizationStatus,
  setComments, setCommentsLoadingStatus, setNearbyOffers,
  setOffer,
  setOfferLoadingStatus,
  setOffersLoadingStatus,
  setUserData
} from './action.ts';
import {TAuthData, TPlaceCard, TPlaceCardFull, TReview, TReviewFormState, TUserFull} from '../utils/types.ts';
import {AppDispatch, State} from '../utils/state.ts';
import {Actions, API_ROUTES, LoadingStatus} from '../utils/const.ts';
import {dropToken, saveToken} from '../api/token.ts';

type DispatchStateExtra = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

export const userLogin = createAsyncThunk<void, TAuthData, DispatchStateExtra> (
  `${Actions.User}/login`,
  async ({ email, password }, { dispatch, extra: api }) => {
    const {status, data} = await api.post<TUserFull>(API_ROUTES.USER.LOGIN, {
      email,
      password,
    });

    if (status === Number(StatusCodes.CREATED)) {
      dispatch(setAuthorizationStatus(true));
      dispatch(setUserData(data));
      saveToken(data.token);
    } else {
      dispatch(setAuthorizationStatus(false));
    }
  }
);

export const userLogout = createAsyncThunk<void, undefined, DispatchStateExtra>(
  `${Actions.User}/logout`,
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(API_ROUTES.USER.LOGOUT);
    dispatch(setAuthorizationStatus(false));
    dispatch(clearUserData());
    dropToken();
  },
);

export const userCheckAuth = createAsyncThunk<void, undefined, DispatchStateExtra>(
  `${Actions.User}/login`,
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<TUserFull>(API_ROUTES.USER.VALIDATE);
      dispatch(setAuthorizationStatus(true));
      dispatch(setUserData(data));
      saveToken(data.token);
    } catch {
      dispatch(setAuthorizationStatus(false));
      dispatch(clearUserData());
    }
  },
);

export const fetchOffers = createAsyncThunk<void, undefined, DispatchStateExtra>(
  `${Actions.Offers}/fetch`,
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersLoadingStatus(LoadingStatus.Pending));
    const {data} = await api.get<TPlaceCard[]>(API_ROUTES.OFFERS.ALL);
    dispatch(fillOffers(data));
    dispatch(setOffersLoadingStatus(LoadingStatus.Success));
  },
);

export const fetchOffer = createAsyncThunk<void, string, DispatchStateExtra>(
  `${Actions.Offer}/fetch`,
  async (id, { dispatch, extra: api }) => {
    dispatch(setOfferLoadingStatus(LoadingStatus.Pending));

    const { status, data } = await api.get<TPlaceCardFull>(API_ROUTES.OFFERS.EXACT(id));

    if (status === Number(StatusCodes.NOT_FOUND)) {
      dispatch(setOfferLoadingStatus(LoadingStatus.Failure));
      return;
    }

    dispatch(setOffer(data));
    dispatch(setOfferLoadingStatus(LoadingStatus.Success));
  },
);

export const fetchOffersNearby = createAsyncThunk<void, string, DispatchStateExtra>(
  `${Actions.Offers}/nearby`,
  async (id, { dispatch, extra: api }) => {
    dispatch(setOffersLoadingStatus(LoadingStatus.Pending));
    const { data: nearbyOffers } = await api.get<TPlaceCard[]>(API_ROUTES.OFFERS.NEARBY(id));
    dispatch(setNearbyOffers(nearbyOffers));
    dispatch(setOffersLoadingStatus(LoadingStatus.Success));
  },
);

export const fetchComments = createAsyncThunk<void, string, DispatchStateExtra>(
  `${Actions.Comment}/fetch`,
  async (id, { dispatch, extra: api }) => {
    dispatch(setOffersLoadingStatus(LoadingStatus.Pending));
    const { data: comments } = await api.get<TReview[]>(API_ROUTES.COMMENTS.GET(id));
    dispatch(setComments(comments));
    dispatch(setCommentsLoadingStatus(LoadingStatus.Success));
  },
);

export const createComment = createAsyncThunk<void, { form: TReviewFormState } & { offerId: string }, DispatchStateExtra>(
  `${Actions.Comment}/create`,
  async ({ offerId, form }, { dispatch, getState, extra: api }) => {
    const { status } = await api.post<TReviewFormState>(API_ROUTES.COMMENTS.POST(offerId), form);

    const state = getState();

    if (status === Number(StatusCodes.CREATED) && state[Actions.Offer].offer?.id === offerId) {
      dispatch(fetchComments(offerId));
    }
  },
);
