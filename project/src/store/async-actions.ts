import { api, store } from './index';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { changeAuthStatus, filterFilms, loadFilms, loadReviews, loadUserInfo, redirectToRoute } from './actions';

import { ApiRoutes, AppRoutes, AuthorizationStatus } from '../constants';
import { dropToken, saveToken } from '../services/token';
import { Film } from '../types/film';
import { AuthData } from '../types/auth-data';
import { Review } from '../types/review';
import { UserData } from '../types/user-data';
import { errorHandle } from '../services/error';

export const fetchFilmsAction = createAsyncThunk(
  'data/fetchFilms',
  async () => {
    try {
      const {data} = await api.get<Film[]>(ApiRoutes.Films);
      store.dispatch(loadFilms(data));
      store.dispatch(filterFilms());
    } catch (err) {
      errorHandle(err);
    }
  },
);

export const fetchReviewsAction = createAsyncThunk(
  'data/fetchReviews',
  async (id: number) => {
    try {
      const {data} = await api.get<Review[]>(`${ApiRoutes.Comments}/${id}`);
      store.dispatch(loadReviews(data));
    } catch (err) {
      errorHandle(err);
    }
  },
);

export const checkAuthAction = createAsyncThunk(
  'user/checkAuth',
  async () => {
    try {
      const {data: {token, ...user}} = await api.get(ApiRoutes.Login);
      store.dispatch(changeAuthStatus(AuthorizationStatus.Auth));
      store.dispatch(loadUserInfo(user));
    } catch(err) {
      errorHandle(err);
    }
  },
);

export const loginAction = createAsyncThunk(
  'user/login',
  async ({email, password}: AuthData) => {
    try {
      const {data: {token, ...user}} = await api.post<UserData>(ApiRoutes.Login, {email, password});
      saveToken(token);
      store.dispatch(changeAuthStatus(AuthorizationStatus.Auth));
      store.dispatch(loadUserInfo(user));
      store.dispatch(redirectToRoute(AppRoutes.Main));
    } catch (err) {
      errorHandle(err);
    }
  },
);

export const logoutAction = createAsyncThunk(
  'user/logout',
  async () => {
    try {
      await api.delete(ApiRoutes.Logout);
      dropToken();
      store.dispatch(changeAuthStatus(AuthorizationStatus.NoAuth));
    } catch (err) {
      errorHandle(err);
    }
  },
);
