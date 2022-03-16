import { createReducer } from '@reduxjs/toolkit';

import { changeGenre, filterFilms, loadFilms, loadReviews } from './actions';

import { ALL_GENRES } from '../constants';
import { FILMS } from '../mocks/films';
import { REVIEWS } from '../mocks/reviews';
import { State } from '../types/state';

const initialState: State = {
  genre: ALL_GENRES,
  films: FILMS,
  filteredFilms: FILMS,
  reviews: REVIEWS,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadFilms, (state: State, {payload}) => {
      state.films = payload;
    })
    .addCase(loadReviews, (state) => {
      state.reviews = [...REVIEWS];
    })
    .addCase(changeGenre, (state, {payload}) => {
      state.genre = payload;
    })
    .addCase(filterFilms, (state) => {
      state.genre === ALL_GENRES
        ? state.filteredFilms = state.films
        : state.filteredFilms = state.films.filter(({genre}) => genre === state.genre);
    });
});

export { reducer };
