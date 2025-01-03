import {offerReducer} from './offerReducer';
import {setActiveOffer, clearOffer, setOffer} from '../action';
import {TPlaceCardFull} from '../../utils/types';
import {LoadingStatus} from '../../utils/const.ts';

describe('offerReducer', () => {
  const initialState = {
    isOfferDataLoading: LoadingStatus.Init,
  };

  const testOffer: TPlaceCardFull = {
    id: '1',
    title: 'Test Offer',
    type: 'apartment',
    price: 150,
    previewImage: '/img/test.jpg',
    city: {
      name: 'Paris',
      location: { latitude: 48.8566, longitude: 2.3522, zoom: 12 },
    },
    location: { latitude: 48.8566, longitude: 2.3522 },
    isFavorite: false,
    isPremium: true,
    rating: 4.8,
    description: 'A great place to stay',
    bedrooms: 2,
    goods: ['Wi-Fi', 'Air conditioning', 'Kitchen'],
    host: {
      name: 'John Doe',
      avatarUrl: '/img/avatar.jpg',
      isPro: true,
    },
    images: ['/img/room1.jpg', '/img/room2.jpg'],
    maxAdults: 4,
  };

  it('should return the initial state by default', () => {
    expect(offerReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle setActiveOffer action', () => {
    const activeOfferId = '123';
    expect(offerReducer(initialState, setActiveOffer(activeOfferId))).toEqual({
      ...initialState,
      activeOffer: activeOfferId,
    });
  });

  it('should handle clearOffer action', () => {
    expect(
      offerReducer({ ...initialState, offer: testOffer }, clearOffer())
    ).toEqual(initialState);
  });

  it('should handle loadOffer action', () => {
    const offer: TPlaceCardFull = {
      id: '1',
      title: 'Test Offer',
      type: 'apartment',
      price: 150,
      previewImage: '/img/test.jpg',
      city: {
        name: 'Paris',
        location: { latitude: 48.8566, longitude: 2.3522, zoom: 12 },
      },
      location: { latitude: 48.8566, longitude: 2.3522 },
      isFavorite: false,
      isPremium: true,
      rating: 4.8,
      description: 'A great place to stay',
      bedrooms: 2,
      goods: ['Wi-Fi', 'Air conditioning', 'Kitchen'],
      host: {
        name: 'John Doe',
        avatarUrl: '/img/avatar.jpg',
        isPro: true,
      },
      images: ['/img/room1.jpg', '/img/room2.jpg'],
      maxAdults: 4,
    };

    expect(offerReducer(initialState, setOffer(testOffer))).toEqual({
      ...initialState,
      offer,
    });
  });
});
