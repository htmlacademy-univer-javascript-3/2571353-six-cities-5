import {TPlaceCard} from '../utils/types.ts';

export const offers: TPlaceCard[] = [
  {
    id: 1,
    isPremium: true,
    imageSrc: 'img/apartment-01.jpg',
    price: 120,
    rating: 4,
    name: 'Beautiful &amp; luxurious apartment at great location',
    type: 'Apartment',
  },
  {
    id: 2,
    isBookmarked: true,
    imageSrc: 'img/room.jpg',
    price: 80,
    rating: 4,
    name: 'Wood and stone place',
    type: 'Room',
  },
  {
    id: 3,
    imageSrc: 'img/apartment-02.jpg',
    price: 132,
    rating: 4,
    name: 'Canal View Prinsengracht',
    type: 'Apartment',
  },
  {
    id: 4,
    isPremium: true,
    imageSrc: 'img/apartment-03.jpg',
    price: 180,
    rating: 4,
    name: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
  }
];
