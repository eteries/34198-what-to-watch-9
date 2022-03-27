import { Film } from './film';
import { Review } from './review';

import { AuthorizationStatus } from '../constants';
import { store } from '../store/';
import { User } from './user';

export type State = {
  genre: string;
  films: Film[];
  filteredFilms: Film[];
  reviews: Review[];
  isDataLoaded: boolean;
  authorizationStatus: AuthorizationStatus;
  user: User | null;
}

export type AppDispatch = typeof store.dispatch;
