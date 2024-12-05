import {TPlaceCard} from '../utils/types.ts';
import {CITIES} from '../utils/const.ts';

export const favorites: TPlaceCard[] = [
  {
    id: '1',
    isFavorite: true,
    isPremium: true,
    previewImage: 'img/apartment-small-03.jpg',
    price: 180,
    rating: 4,
    title: 'Nice, cozy, warm big bed apartment',
    type: 'apartment',
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198
    },
    city: CITIES.Amsterdam
  },
  {
    id: '2',
    isFavorite: true,
    isPremium: false,
    previewImage: 'img/room-small.jpg',
    price: 80,
    rating: 4,
    title: 'Wood and stone place',
    type: 'room',
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198
    },
    city: CITIES.Amsterdam
  },
  {
    id: '3',
    isFavorite: true,
    isPremium: false,
    previewImage: 'img/apartment-02.jpg',
    price: 180,
    rating: 5,
    title: 'White castle',
    type: 'apartment',
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198
    },
    city: CITIES.Amsterdam
  }
];
