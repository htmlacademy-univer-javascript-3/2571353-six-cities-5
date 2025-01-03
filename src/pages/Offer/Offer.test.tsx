import { render, screen } from '@testing-library/react';
import * as ReactRouterDom from 'react-router-dom';
import { vi } from 'vitest';

import { Offer } from './Offer';
import {initAsyncActionsStore, mockState, withHistory} from '../../utils/mocks.tsx';
import {Provider} from 'react-redux';
import {Actions, LoadingStatus} from '../../utils/const.ts';

vi.mock('../../components/header/header', () => ({
  Header: () => <div data-testid="header">Header</div>,
}));

vi.mock('../../components/map/map', () => ({
  Map: () => <div data-testid="map">Map</div>,
}));

vi.mock('../../components/OfferList/OfferList', () => ({
  OfferList: () => <div data-testid="offer-list">OfferList</div>,
}));

vi.mock('../../components/ReviewList/ReviewsList', () => ({
  ReviewsList: () => <div data-testid="reviews-list">ReviewsList</div>,
}));

vi.mock('../../components/ReviewList/ReviewForm', () => ({
  ReviewForm: () => <div data-testid="review-form">ReviewForm</div>,
}));

vi.mock('../../components/spinner/spinner', () => ({
  Spinner: () => <div data-testid="spinner">Spinner</div>,
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof ReactRouterDom>('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ id: '1' }),
  };
});

const {mockStoreCreator} = initAsyncActionsStore();

describe('Offer', () => {
  it('should render "Offer" page correctly', () => {
    const mockStateCopy = structuredClone(mockState);
    mockStateCopy[Actions.Offer].isOfferDataLoading = LoadingStatus.Pending;

    const withHistoryComponent = withHistory(
      <Provider store={mockStoreCreator(mockStateCopy)}>
        <Offer/>
      </Provider>
    );

    render(withHistoryComponent);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('should render correctly with offer data', () => {
    const mockStateCopy = structuredClone(mockState);
    mockStateCopy[Actions.User].authorizationStatus = true;

    const withHistoryComponent = withHistory(
      <Provider store={mockStoreCreator(mockStateCopy)}>
        <Offer/>
      </Provider>
    );

    render(withHistoryComponent);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();
    expect(screen.getByText('Test Offer')).toBeInTheDocument();
    expect(screen.getByText('description')).toBeInTheDocument();
  });
});
