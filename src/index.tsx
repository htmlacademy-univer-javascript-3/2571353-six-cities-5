import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './App.tsx';
import {TPlaceCard} from './utils/types.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const places: TPlaceCard[] = [
  {
    isPremium: true,
    imageSrc: 'img/apartment-01.jpg',
    price: 120,
    rating: 4,
    name: 'Beautiful &amp; luxurious apartment at great location',
    type: 'Apartment',
  },
  {
    isBookmarked: true,
    imageSrc: 'img/room.jpg',
    price: 80,
    rating: 4,
    name: 'Wood and stone place',
    type: 'Room',
  },
  {
    imageSrc: 'img/apartment-02.jpg',
    price: 132,
    rating: 4,
    name: 'Canal View Prinsengracht',
    type: 'Apartment',
  },
  {
    isPremium: true,
    imageSrc: 'img/apartment-03.jpg',
    price: 180,
    rating: 4,
    name: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
  },
  {
    isBookmarked: true,
    imageSrc: 'img/room.jpg',
    price: 80,
    rating: 4,
    name: 'Wood and stone place',
    type: 'Room',
  },
];

root.render(
  <React.StrictMode>
    <App places={places}/>
  </React.StrictMode>
);
