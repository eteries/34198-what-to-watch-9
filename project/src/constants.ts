import { RatingData } from './types/rating-data';

export enum AppRoute {
  Main=  '/',
  SignIn = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
  Films = '/films',
  AddReview = '/films/:id/review',
  Player = '/player/:id',
}

export enum ApiRoute {
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

export enum Setting {
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

export enum FilmTab {
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

export enum Message {
  ReviewSent = 'Your review has been successfully added',
  LoggedOut = 'You have been successfully logged out',
  FavoriteRemoved = 'The film has been successfully removed from your list',
  FavoriteAdded = 'The film has been successfully added to your list',
  UnknownError = 'Some data seems temporally unavailable. Try again later.',
  PasswordPatternMismatch = 'The password should consist of at least one digit and one letter',
  EmailPatternMismatch = 'The email should follow the pattern: name@site.zone'
}

export enum ApiCommand {
  Remove = 0,
  Add = 1
}

export enum NameSpace {
  App = 'APP',
  Content = 'CONTENT',
  User = 'USER'
}

export enum Pattern {
  Password = '^(?=.*[A-Za-z])(?=.*[0-9]).+',
  Email = '^\\S+@\\S+\\.[a-z]{2,}$'
}

export enum Validator {
  PatternMismatch = 'patternMismatch'
}

export enum ReviewLength {
  Min = 50,
  Max = 400
}
