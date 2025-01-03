import {configureMockStore} from '@jedmao/redux-mock-store';
import {Action} from '@reduxjs/toolkit';
import MockAdapter from 'axios-mock-adapter';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {createAPI} from '../api/api.ts';
import {State} from './state.ts';
import {Actions, LoadingStatus} from './const.ts';
import {TRootReducer} from '../store/root-reducer.ts';
import {createMemoryHistory, MemoryHistory} from 'history';
import {HistoryRouter} from './history-router.tsx';

type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export const initAsyncActionsStore = () => {
  const axios = createAPI();
  const mockAxios = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);

  return {mockAxios, mockStoreCreator};
};

export function withHistory(component: JSX.Element, history?: MemoryHistory) {
  const memoryHistory = history ?? createMemoryHistory();

  return (
    <HistoryRouter history={memoryHistory}>
      {component}
    </HistoryRouter>
  );
}

export const mockState: TRootReducer = {
  [Actions.User]: {
    authorizationStatus: false,
    userData: {
      name: 'John Doe',
      avatarUrl: '/img/avatar.jpg',
      isPro: false,
      email: 'john.doe@example.com',
      token: 'token123',
    },
  },
  [Actions.City]: {
    city: {
      name: 'Paris',
      location: {latitude: 48.8566, longitude: 2.3522, zoom: 12},
    },
  },
  [Actions.Offers]: {
    offers: [],
    nearbyOffers: [],
    isOffersDataLoading: LoadingStatus.Success,
  },
  [Actions.Offer]: {
    activeOffer: '1',
    offer: {
      id: '1',
      title: 'Test offer',
      type: 'apartment',
      price: 100,
      isFavorite: false,
      isPremium: true,
      rating: 4.5,
      city: {name: 'Paris', location: {latitude: 48.8566, longitude: 2.3522}},
      location: {latitude: 48.8566, longitude: 2.3522},
      description: 'description',
      bedrooms: 2,
      goods: ['window'],
      host: {
        name: 'Aba',
        avatarUrl: 'img/src1.jpg',
        isPro: false
      },
      images: ['img/src1.jpg'],
      maxAdults: 2
    },
    isOfferDataLoading: LoadingStatus.Success,
  },
  Comments: {
    comments: [],
    isCommentsDataLoading: LoadingStatus.Success
  },
  Favorites: {
    favorites: [],
    isFavoritesDataLoading: LoadingStatus.Success
  },
};
