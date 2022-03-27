export enum AppRoutes {
  Main=  '/',
  SignIn = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
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
  Logout = 'logout'
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

export enum Rating {
  Bad= 'Bad',
  Normal = 'Normal',
  Good = 'Good',
  Very_Good = 'Very Good',
  Awesome = 'Awesome'
}

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
