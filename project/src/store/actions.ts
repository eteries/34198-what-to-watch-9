import { createAction } from '@reduxjs/toolkit';

import { AppRoutes, AuthorizationStatus } from '../constants';
import { Film } from '../types/film';
import { Review } from '../types/review';
import { User } from '../types/user';

export const loadFilms = createAction<Film[]>('films/load');

export const loadPromoFilm = createAction<Film>('films/loadPromoFilm');

export const loadReviews = createAction<Review[]>('films/loadReviews');

export const postReview = createAction<Review[]>('films/postReview');

export const loadSimilarFilms = createAction<Film[]>('films/loadSimilarFilms');

export const loadFavoriteFilms = createAction<Film[]>('films/loadFavoriteFilms');

export const loadUserInfo = createAction<User | null>('user/loadInfo');

export const changeGenre = createAction<string>('films/changeGenre');

export const filterFilms = createAction('films/filter');

export const changeAuthStatus = createAction<AuthorizationStatus>('user/changeAuthStatus');

export const changeLoadingStatus = createAction<boolean>('user/changeLoadedStatus');

export const redirectToRoute = createAction<AppRoutes | string>('app/redirectToRoute');

export const replaceFilm = createAction<Film>('data/replaceFilm');
