import {TReview} from '../utils/types.ts';

export const REVIEWS: TReview[] = [
  {
    id: 1,
    date: new Date('2019-05-08T14:13:56.569Z'),
    user: {
      name: 'Oliver Conner',
      avatarUrl: 'https://url-to-image/image.png',
      isPro: false
    },
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    rating: 4
  },
  {
    id: 2,
    date: new Date('2024-05-08T14:13:56.569Z'),
    user: {
      name: 'Ozer Fuant',
      avatarUrl: 'https://url-to-image/image.png',
      isPro: false
    },
    comment: 'Amsterdam. good',
    rating: 2
  }
];
