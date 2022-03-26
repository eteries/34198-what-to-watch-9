import { createAction } from '@reduxjs/toolkit';

import { Film } from '../types/film';
import { Review } from '../types/review';
import { AppRoutes, AuthorizationStatus } from '../constants';
import { User } from '../types/user';

export const loadFilms = createAction<Film[]>('films/load');

export const loadReviews = createAction<Review[]>('films/loadReviews');

export const loadUserInfo = createAction<User>('user/loadInfo');

export const changeGenre = createAction<string>('films/changeGenre');

export const filterFilms = createAction('films/filter');

export const changeAuthStatus = createAction<AuthorizationStatus>('user/changeAuthStatus');

export const redirectToRoute = createAction<AppRoutes>('app/redirectToRoute');
