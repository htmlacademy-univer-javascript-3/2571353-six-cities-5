import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {vi} from 'vitest';
import {Main} from './main.tsx';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {mockState} from '../../utils/mocks.tsx';
import {Actions, LoadingStatus} from '../../utils/const.ts';

vi.mock('../../store/hooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

vi.mock('../../components/header/header', () => ({
  Header: () => <div data-testid="header">Header</div>,
}));

vi.mock('../../components/city-list/city-list', () => ({
  CityList: () => <div data-testid="city-list">CityList</div>,
}));

vi.mock('../../components/sort-filter/sort-filter', () => ({
  SortFilter: () => <div data-testid="sort-filter">SortFilter</div>,
}));

vi.mock('../../components/offer-list/offer-list', () => ({
  OfferList: () => <div data-testid="offer-list">OfferList</div>,
}));

vi.mock('../../components/map/map', () => ({
  Map: () => <div data-testid="map">Map</div>,
}));

vi.mock('../../components/spinner/spinner', () => ({
  Spinner: () => <div data-testid="spinner">Spinner</div>,
}));

describe('Component: main', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);
  });

  it('should render correctly with offers', () => {
    const mockStateCopy = structuredClone(mockState);
    mockStateCopy[Actions.Offers].offers = [
      {
        id: '1',
        title: 'Nice apartment in Paris',
        type: 'apartment',
        price: 120,
        location: { latitude: 48.8566, longitude: 2.3522 },
        city: { name: 'Paris', location: { latitude: 48.8566, longitude: 2.3522 } },
        isFavorite: false,
        isPremium: true,
        rating: 4.5,
      },
    ];

    vi.mocked(useAppSelector).mockImplementation((selector) =>
      selector(mockStateCopy)
    );

    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('city-list')).toBeInTheDocument();
    expect(screen.getByTestId('sort-filter')).toBeInTheDocument();
    expect(screen.getByTestId('offer-list')).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();
  });

  it('should render Spinner during loading', () => {
    const mockStateCopy = structuredClone(mockState);
    mockStateCopy[Actions.Offers].isOffersDataLoading = LoadingStatus.Pending;

    vi.mocked(useAppSelector).mockImplementation((selector) =>
      selector(mockStateCopy)
    );

    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.queryByTestId('offer-list')).not.toBeInTheDocument();
  });

  it('should render "No places to stay available" if no offers', () => {
    vi.mocked(useAppSelector).mockImplementation((selector) =>
      selector(mockState)
    );

    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(screen.getByText('We could not find any property available at the moment in Paris')).toBeInTheDocument();
  });
});
