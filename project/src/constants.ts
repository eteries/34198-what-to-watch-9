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

export const ALL_GENRES = 'All genres';

export enum Settings {
  DefaultRating = 8,
  StarsNum = 10,
  VideoPreviewDelay = 1000,
  GenresMaxLength = 10,
  FilmListChunk = 8,
  SimilarFilmsMaxNum = 4
}

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

export enum Messages {
  ReviewSent = 'Your review has been successfully added',
  LoggedOut = 'You have been successfully logged out',
  FavoriteRemoved = 'The film has been successfully removed from your list',
  FavoriteAdded = 'The film has been successfully added to your list',
  UnknownError = 'Some data seems temporally unavailable. Try again later.'
}

export enum ApiCommand {
  Remove = 0,
  Add = 1
}
