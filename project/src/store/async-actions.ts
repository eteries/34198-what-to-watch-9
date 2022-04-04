import { api, store } from './index';
import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  changeAuthStatus,
  changeLoadingStatus,
  filterFilms,
  loadFavoriteFilms,
  loadFilms,
  loadPromoFilm,
  loadReviews,
  loadSimilarFilms,
  loadUserInfo,
  redirectToRoute,
  replaceFilm
} from './actions';

import { ApiRoute, AppRoute, AuthorizationStatus, Message } from '../constants';
import { dropToken, saveToken } from '../services/token';
import { Film } from '../types/film';
import { AuthData } from '../types/auth-data';
import { Review } from '../types/review';
import { UserData } from '../types/user-data';
import { errorHandle } from '../services/error';
import { ReviewData } from '../types/review-data';
import { toast } from 'react-toastify';
import { FavoriteData } from '../types/favorite-data';

export const fetchFilmsAction = createAsyncThunk(
  'data/fetchFilms',
  async () => {
    try {
      store.dispatch(changeLoadingStatus(true));
      const {data} = await api.get<Film[]>(ApiRoute.Films);
      store.dispatch(loadFilms(data));
      store.dispatch(filterFilms());
      store.dispatch(changeLoadingStatus(false));
    } catch (err) {
      errorHandle(err);
      store.dispatch(changeLoadingStatus(false));
    }
  },
);

export const fetchPromoFilmAction = createAsyncThunk(
  'data/fetchPromoFilm',
  async () => {
    try {
      store.dispatch(changeLoadingStatus(true));
      const {data} = await api.get<Film>(ApiRoute.Promo);
      store.dispatch(loadPromoFilm(data));
      store.dispatch(changeLoadingStatus(false));
    } catch (err) {
      errorHandle(err);
      store.dispatch(changeLoadingStatus(false));
    }
  },
);

export const fetchReviewsAction = createAsyncThunk(
  'data/fetchReviews',
  async (id: number) => {
    try {
      const {data} = await api.get<Review[]>(`${ApiRoute.Comments}/${id}`);
      store.dispatch(loadReviews(data));
    } catch (err) {
      errorHandle(err);
    }
  },
);

export const fetchSimilarFilmsAction = createAsyncThunk(
  'data/fetchSimilarFilms',
  async (id: number) => {
    try {
      const {data} = await api.get<Film[]>(`${ApiRoute.Films}/${id}${ApiRoute.Similar}`);
      store.dispatch(loadSimilarFilms(data));
    } catch (err) {
      errorHandle(err);
    }
  },
);

export const fetchFavoriteFilmsAction = createAsyncThunk(
  'data/fetchFavoriteFilms',
  async () => {
    try {
      const {data} = await api.get<Film[]>(`${ApiRoute.Favorites}`);
      store.dispatch(loadFavoriteFilms(data));
    } catch (err) {
      errorHandle(err);
    }
  },
);

export const postReviewAction = createAsyncThunk(
  'data/postReview',
  async ({filmId, ...review}: ReviewData) => {
    try {
      store.dispatch(changeLoadingStatus(true));
      const {data} = await api.post<Review[]>(`${ApiRoute.Comments}/${filmId}`, {...review});
      store.dispatch(loadReviews(data));
      store.dispatch(changeLoadingStatus(false));
      store.dispatch(redirectToRoute(`${AppRoute.Films}/${filmId}`));
      toast.success(Message.ReviewSent);
    } catch (err) {
      errorHandle(err);
      store.dispatch(changeLoadingStatus(false));
    }
  },
);

export const changeFavoriteStatusAction = createAsyncThunk(
  'data/changeFavoriteStatus',
  async ({filmId, status}: FavoriteData) => {
    try {
      store.dispatch(changeLoadingStatus(true));
      const {data} = await api.post<Film>(`${ApiRoute.Favorites}/${filmId}/${status}`);
      store.dispatch(replaceFilm(data));
      store.dispatch(loadFavoriteFilms([]));
      store.dispatch(redirectToRoute(AppRoute.MyList));
      store.dispatch(changeLoadingStatus(false));
      status
        ? toast.success(Message.FavoriteAdded)
        : toast.success(Message.FavoriteRemoved);
    } catch (err) {
      errorHandle(err);
      store.dispatch(changeLoadingStatus(false));
    }
  },
);

export const checkAuthAction = createAsyncThunk(
  'user/checkAuth',
  async () => {
    try {
      const {data: {token, ...user}} = await api.get(ApiRoute.Login);
      store.dispatch(changeAuthStatus(AuthorizationStatus.Auth));
      store.dispatch(loadUserInfo(user));
    } catch(err) {
      errorHandle(err);
      store.dispatch(changeAuthStatus(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk(
  'user/login',
  async ({email, password}: AuthData) => {
    try {
      const {data: {token, ...user}} = await api.post<UserData>(ApiRoute.Login, {email, password});
      saveToken(token);
      store.dispatch(changeAuthStatus(AuthorizationStatus.Auth));
      store.dispatch(loadUserInfo(user));
      store.dispatch(redirectToRoute(AppRoute.Main));
    } catch (err) {
      errorHandle(err);
    }
  },
);

export const logoutAction = createAsyncThunk(
  'user/logout',
  async () => {
    try {
      await api.delete(ApiRoute.Logout);
      dropToken();
      store.dispatch(changeAuthStatus(AuthorizationStatus.NoAuth));
      store.dispatch(loadUserInfo(null));
      toast.success(Message.LoggedOut);
    } catch (err) {
      errorHandle(err);
    }
  },
);
