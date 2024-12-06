import {TCity, TCityName} from './types.ts';

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id'
}

export enum ObjectClass {
  Place = 'place-card',
  Review = 'reviews',
  Offer = 'offer'
}

export enum PlaceClassTypes {
  Cities = 'cities',
  NearPlaces = 'near-places',
  Favorites = 'favorites'
}

export enum SortName {
  Popular = 'Popular',
  LowToHigh = 'Price: low to high',
  HighToLow = 'Price: high to low',
  TopRated = 'Top rated first',
}

export enum Actions {
  City = 'City',
  Offers = 'Offers',
  Offer = 'Offer',
  Favorite = 'Favorite',
  Comment = 'Comment',
  User = 'User'
}

export enum LoadingStatus {
  Init = 'Init',
  Pending = 'Pending',
  Success = 'Success',
  Failure = 'Failure'
}

export const COMMENT_STARS = [
  { rating: 5, title: 'perfect' },
  { rating: 4, title: 'good' },
  { rating: 3, title: 'not bad' },
  { rating: 2, title: 'badly' },
  { rating: 1, title: 'terribly' },
];

export const CITIES: Record<TCityName, TCity> = {
  Paris: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 12
    }
  },
  Cologne: {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 12
    }
  },
  Brussels: {
    name: 'Brussels',
    location: {
      latitude: 50.8476,
      longitude: 4.3572,
      zoom: 10
    }
  },
  Amsterdam: {
    name: 'Amsterdam',
    location: {
      latitude: 52.374,
      longitude: 4.89,
      zoom: 10
    }
  },
  Hamburg: {
    name: 'Hamburg',
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 10
    }
  },
  Dusseldorf: {
    name: 'Dusseldorf',
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 10
    }
  },
};

export const API_ROUTES = {
  OFFERS: {
    ALL: '/offers',
    EXACT: (offerId: string) => `/offers/${offerId}`,
    NEARBY: (offerId: string) => `/offers/${offerId}/nearby`,
  },
  FAVORITE: {
    GET: '/favorite',
    SET_STATUS: (offerId: string, status: boolean) => `/favorite/${offerId}/${status}`,
  },
  COMMENTS: {
    GET: (offerId: string) => `/comments/${offerId}`,
    POST: (offerId: string) => `/comments/${offerId}`,
  },
  USER: {
    VALIDATE: '/login',
    LOGIN: '/login',
    LOGOUT: '/logout',
  },
};
