import { Film } from './film';
import { Review } from './review';

import { store } from '../store/';

export type State = {
  genre: string,
  films: Film[],
  filteredFilms: Film[],
  reviews: Review[],
}

export type AppDispatch = typeof store.dispatch;
