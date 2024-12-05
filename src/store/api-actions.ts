import {AppDispatch} from '../utils/state.ts';
import {State} from 'history';
import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {fillOffers, setOffersLoadingStatus} from './action.ts';
import {TPlaceCard} from '../utils/types.ts';
import {Actions, API_ROUTES} from '../utils/const.ts';

export const fetchOffers = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${Actions.OFFERS}/fetch`,
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersLoadingStatus(true));
    const {data} = await api.get<TPlaceCard[]>(API_ROUTES.OFFERS.ALL);
    dispatch(fillOffers(data));
    dispatch(setOffersLoadingStatus(false));
  },
);
