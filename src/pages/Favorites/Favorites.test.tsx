import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import { Favorites } from './Favorites';
import { AppRoute, Actions, LoadingStatus } from '../../utils/const';
import {initAsyncActionsStore, mockState} from '../../utils/mocks.tsx';

vi.mock('../../components/header/header', () => ({
  Header: () => <div data-testid="header">Header</div>,
}));

vi.mock('../../components/city-offers-list/CityOffersList', () => ({
  CityOffersList: () => <div data-testid="city-offers-list">CityOffersList</div>,
}));

const {mockStoreCreator} = initAsyncActionsStore();

describe('Component: Favorites', () => {
  it('should render empty state when there are no favorites', () => {
    const mockStateFavorites = {
      [Actions.Favorites]: {
        favorites: [],
        isFavoritesDataLoading: LoadingStatus.Success,
      },
    };
    const store = mockStoreCreator(mockStateFavorites);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Favorites />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
    expect(
      screen.getByText('Save properties to narrow down search or plan your future trips.')
    ).toBeInTheDocument();
    expect(screen.queryByTestId('city-offers-list')).not.toBeInTheDocument();
  });

  it('should render saved listings when favorites are available', () => {
    const mockStateCopy = structuredClone(mockState);

    mockStateCopy[Actions.Favorites].favorites = [
      {
        id: '1',
        title: 'Test Offer',
        type: 'apartment',
        price: 100,
        isFavorite: false,
        isPremium: true,
        rating: 4.5,
        city: {name: 'Paris', location: {latitude: 48.8566, longitude: 2.3522}},
        location: {latitude: 48.8566, longitude: 2.3522}
      },
    ];

    const store = mockStoreCreator(mockStateCopy);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Favorites />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
    expect(screen.getByTestId('city-offers-list')).toBeInTheDocument();
  });

  it('should display the footer with a link to the main page', () => {
    const mockStateFavorites = {
      [Actions.Favorites]: {
        favorites: [],
        isFavoritesDataLoading: LoadingStatus.Success,
      },
    };
    const store = mockStoreCreator(mockStateFavorites);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Favorites />
        </MemoryRouter>
      </Provider>
    );

    const footerLink = screen.getByRole('link', { name: /6 cities logo/i });
    expect(footerLink).toHaveAttribute('href', AppRoute.Main);
  });
});
