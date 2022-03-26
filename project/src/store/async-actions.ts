import { api, store } from './index';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { changeAuthStatus, filterFilms, loadFilms, loadReviews, loadUserInfo } from './actions';

import { ApiRoutes, AuthorizationStatus } from '../constants';
import { Film } from '../types/film';
import { dropToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { Review } from '../types/review';
import { UserData } from '../types/user-data';

export const fetchFilmsAction = createAsyncThunk(
  'data/fetchFilms',
  async () => {
    const {data} = await api.get<Film[]>(ApiRoutes.Films);
    store.dispatch(loadFilms(data));
    store.dispatch(filterFilms());
  },
);

export const fetchReviewsAction = createAsyncThunk(
  'data/fetchReviews',
  async (id: Pick<Film, 'id'>) => {
    const {data} = await api.get<Review[]>(`${ApiRoutes.Comments}/${id}`);
    store.dispatch(loadReviews(data));
  },
);

export const checkAuthAction = createAsyncThunk(
  'user/checkAuth',
  async () => {
    await api.get(ApiRoutes.Login);
    store.dispatch(changeAuthStatus(AuthorizationStatus.Auth));
  },
);

export const loginAction = createAsyncThunk(
  'user/login',
  async ({email: email, password}: AuthData) => {
    const {data: {token, ...user}} = await api.post<UserData>(ApiRoutes.Login, {email, password});
    saveToken(token);
    store.dispatch(changeAuthStatus(AuthorizationStatus.Auth));
    store.dispatch(loadUserInfo(user));
  },
);

export const logoutAction = createAsyncThunk(
  'user/logout',
  async () => {
    await api.delete(ApiRoutes.Logout);
    dropToken();
    store.dispatch(changeAuthStatus(AuthorizationStatus.NoAuth));
  },
);
