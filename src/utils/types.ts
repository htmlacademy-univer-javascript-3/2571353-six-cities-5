export type TPlaceType = 'Apartment' | 'Room';

export type TPlaceCard = {
  isPremium?: boolean;
  isBookmarked?: boolean;
  imageSrc: string;
  imageAlt?: string;
  price: number;
  rating: 1 | 2 | 3 | 4 | 5;
  name: string;
  type: TPlaceType;
};
