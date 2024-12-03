export type TRating = 1 | 2 | 3 | 4 | 5;
export type TPlaceType = 'Apartment' | 'Room';

export type TCityName = 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf';

export type TPlaceCard = {
  id: number;
  isPremium?: boolean;
  isBookmarked?: boolean;
  imageSrc: string;
  price: number;
  rating: TRating;
  name: string;
  type: TPlaceType;
  location: TPoint;
};

export type TReviewFormState = {
  comment: string;
  rating: number;
};

export type TCityObject = {
  name: TCityName;
  location: TPoint;
}

export type TPoint = {
  latitude: number;
  longitude: number;
}

type TUser = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type TReview = {
  id: number;
  date: Date;
  user: TUser;
  comment: string;
  rating: TRating;
}
