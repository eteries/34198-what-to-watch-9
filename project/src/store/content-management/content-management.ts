import { createSlice } from '@reduxjs/toolkit';

import { ALL_GENRES, NameSpace } from '../../constants';
import { ContentManagement } from '../../types/state';

const initialState: ContentManagement = {
  films: [],
  filteredFilms: [],
  reviews: [],
  similarFilms: [],
  favoriteFilms: [],
  promoFilm: null,
  genre: ALL_GENRES,
};

export const contentManagement = createSlice({
  name: NameSpace.Content,
  initialState,
  reducers: {
    loadFilms: (state, action) => {
      state.films = action.payload;
    },
    loadPromoFilm: (state, action) => {
      state.promoFilm = action.payload;
    },
    loadReviews: (state, action) => {
      state.reviews = action.payload;
    },
    loadSimilarFilms: (state, action) => {
      state.similarFilms = action.payload;
    },
    loadFavoriteFilms: (state, action) => {
      state.favoriteFilms= action.payload;
    },
    changeGenre: (state, action) => {
      state.genre = action.payload;
    },
    filterFilms: (state) => {
      state.genre === ALL_GENRES
        ? state.filteredFilms = state.films
        : state.filteredFilms = state.films.filter(({genre}) => genre === state.genre);
    },
    replaceFilm: (state, action) => {
      const index = state.films.findIndex(({id}) => id === action.payload.id);
      state.films[index] = action.payload;
    },
  },
});

export const {
  loadFilms,
  loadPromoFilm,
  loadReviews,
  loadSimilarFilms,
  loadFavoriteFilms,
  changeGenre,
  filterFilms,
  replaceFilm,
} = contentManagement.actions;
