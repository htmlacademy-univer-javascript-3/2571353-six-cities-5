import {offersReducer} from './offersReducer';
import {fillOffers, setOffersLoadingStatus, setNearbyOffers, clearNearbyOffers} from '../action';
import {LoadingStatus} from '../../utils/const';
import {TPlaceCard} from '../../utils/types';

describe('offersReducer', () => {
  const initialState = {
    offers: [],
    nearbyOffers: [],
    isOffersDataLoading: LoadingStatus.Init,
  };

  const mockOffer: TPlaceCard = {
    id: '1',
    title: 'Test Offer',
    type: 'apartment',
    price: 100,
    previewImage: '/img/test1.jpg',
    city: {
      name: 'Paris',
      location: { latitude: 48.8566, longitude: 2.3522, zoom: 12 },
    },
    location: { latitude: 48.8566, longitude: 2.3522 },
    isFavorite: false,
    isPremium: true,
    rating: 4.5,
  };

  it('should return the initial state by default', () => {
    expect(offersReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle fillOffers action', () => {
    const mockOffers = [mockOffer];
    expect(offersReducer(initialState, fillOffers(mockOffers))).toEqual({
      ...initialState,
      offers: mockOffers,
    });
  });

  it('should handle setNearbyOffers action', () => {
    const mockNearbyOffers = [mockOffer];
    expect(offersReducer(initialState, setNearbyOffers(mockNearbyOffers))).toEqual({
      ...initialState,
      nearbyOffers: mockNearbyOffers,
    });
  });

  it('should handle clearNearbyOffers action', () => {
    const stateWithNearbyOffers = {
      ...initialState,
      nearbyOffers: [mockOffer],
      isOffersDataLoading: LoadingStatus.Pending,
    };

    expect(offersReducer(stateWithNearbyOffers, clearNearbyOffers())).toEqual({
      ...initialState,
      nearbyOffers: [],
      isOffersDataLoading: LoadingStatus.Success,
    });
  });

  it('should handle setOffersLoadingStatus action', () => {
    expect(
      offersReducer(initialState, setOffersLoadingStatus(LoadingStatus.Pending))
    ).toEqual({
      ...initialState,
      isOffersDataLoading: LoadingStatus.Pending,
    });
  });
});
