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
