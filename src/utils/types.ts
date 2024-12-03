export type TPlaceType = 'Apartment' | 'Room';

export type TPlaceCard = {
  id: number;
  isPremium?: boolean;
  isBookmarked?: boolean;
  imageSrc: string;
  imageAlt?: string;
  price: number;
  rating: 1 | 2 | 3 | 4 | 5;
  name: string;
  type: TPlaceType;
  location: TPoint;
};

export type TReviewFormState = {
  comment: string;
  rating: number;
};

export type TCityName = 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf';

export type TCityObject = {
  name: TCityName;
  location: TPoint;
}

export type TPoint = {
  latitude: number;
  longitude: number;
}
