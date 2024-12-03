import {TPlaceCard} from '../utils/types.ts';

export const favorites: TPlaceCard[] = [
  {
    id: 1,
    isBookmarked: true,
    isPremium: true,
    imageSrc: 'img/apartment-small-03.jpg',
    price: 180,
    rating: 4,
    name: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198
    }
  },
  {
    id: 2,
    isBookmarked: true,
    imageSrc: 'img/room-small.jpg',
    price: 80,
    rating: 4,
    name: 'Wood and stone place',
    type: 'Room',
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198
    }
  },
  {
    id: 3,
    isBookmarked: true,
    imageSrc: 'img/apartment-02.jpg',
    price: 180,
    rating: 5,
    name: 'White castle',
    type: 'Apartment',
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198
    }
  }
];
