export type TPlaceCard = {
  id: string;
  title: string;
  type: TPlaceType;
  price: number;
  previewImage: string;
  city: TCity;
  location: TPoint;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  // description: string;
  // bedroom: number;
  // goods: string[];
  // host: THost;
  // images: string[];
  // maxAdults: number;
};

export type TPlaceType = 'apartment' | 'room' | 'house' | 'hotel';

export type TCityName = 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf';

export type TCity = {
  name: TCityName;
  location: TPoint;
}

export type TPoint = {
  latitude: number;
  longitude: number;
  zoom?: number;
}

// export type THost = {
//   name: string;
//   avatarUrl: string;
//   isPro: boolean;
// }

export type TReviewFormState = {
  comment: string;
  rating: number;
};

export type TReview = {
  id: number;
  date: Date;
  user: TUser;
  comment: string;
  rating: number;
}

export type TUser = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}
