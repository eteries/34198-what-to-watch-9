import { RatingData } from './types/rating-data';

export enum AppRoutes {
  Main=  '/',
  SignIn = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
  Films = '/films',
  AddReview = '/films/:id/review',
  Player = '/player/:id',
}

export enum ApiRoutes {
  Films = '/films',
  Similar = '/similar',
  Promo = '/promo',
  Favorites = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum Rating {
  DefaultValue = 8,
  StarsNum = 10,
}

export const VIDEO_PREVIEW_DELAY = 1000;

export const ALL_GENRES = 'All genres';

export enum HTTP_CODE {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
}

export enum FilmTabs {
  Overview = 'Overview',
  Details = 'Details',
  Reviews = 'Reviews',
}

export const FilmRating: RatingData = {
  Bad: {
    Label: 'Bad',
    Min: 0,
    Max: 3,
  },
  Normal: {
    Label: 'Normal',
    Min: 3,
    Max: 5,
  },
  Good: {
    Label: 'Good',
    Min: 5,
    Max: 8,
  },
  VeryGood: {
    Label: 'Very Good',
    Min: 8,
    Max: 10,
  },
  Awesome: {
    Label: 'Awesome',
    Min: 10,
    Max: 10,
  },
};

export enum Month {
  January,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December
}

export const FILM_LIST_CHUNK_SIZE = 8;
