import { Film } from './film';
import { Review } from './review';
import { User } from './user';

import { AuthorizationStatus } from '../constants';
import { store } from '../store/';

export type AppManagement = {
  isLoading: boolean;
};

export type ContentManagement = {
  films: Film[];
  filteredFilms: Film[];
  reviews: Review[];
  similarFilms: Film[];
  favoriteFilms: Film[];
  promoFilm: Film | null;
  genre: string;
};

export type UserManagement = {
  authorizationStatus: AuthorizationStatus;
  user: User | null;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
