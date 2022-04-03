import { createReducer } from '@reduxjs/toolkit';

import {
  changeAuthStatus,
  changeGenre,
  changeLoadingStatus,
  filterFilms, loadFavoriteFilms,
  loadFilms,
  loadReviews,
  loadSimilarFilms,
  loadUserInfo, replaceFilm
} from './actions';

import { ALL_GENRES, AuthorizationStatus } from '../constants';
import { State } from '../types/state';

const initialState: State = {
  genre: ALL_GENRES,
  films: [],
  filteredFilms: [],
  reviews: [],
  similarFilms: [],
  favoriteFilms: [],
  isLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadFilms, (state: State, {payload}) => {
      state.films = payload;
    })
    .addCase(loadReviews, (state: State, {payload}) => {
      state.reviews = payload;
    })
    .addCase(loadSimilarFilms, (state: State, {payload}) => {
      state.similarFilms = payload;
    })
    .addCase(loadFavoriteFilms, (state: State, {payload}) => {
      state.favoriteFilms = payload;
    })
    .addCase(loadUserInfo, (state: State, {payload}) => {
      state.user = payload;
    })
    .addCase(changeGenre, (state, {payload}) => {
      state.genre = payload;
    })
    .addCase(filterFilms, (state) => {
      state.genre === ALL_GENRES
        ? state.filteredFilms = state.films
        : state.filteredFilms = state.films.filter(({genre}) => genre === state.genre);
    })
    .addCase(changeAuthStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(changeLoadingStatus, (state, action) => {
      state.isLoading = action.payload;
    })
    .addCase(replaceFilm, (state, action) => {
      const index = state.films.findIndex(({id}) => id === action.payload.id);
      state.films[index] = action.payload;
    });
});

export { reducer };
