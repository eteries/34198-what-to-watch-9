import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';

import { changeLoadingStatus } from './app-management/app-management';
import { redirectToRoute } from './actions';

import {
  filterFilms,
  loadFavoriteFilms,
  loadFilms,
  loadPromoFilm,
  loadReviews,
  loadSimilarFilms,
  replaceFilm
} from './content-management/content-management';

import { changeAuthStatus, loadInfo } from './user-management/user-management';

import { ApiRoute, AppRoute, AuthorizationStatus, Message } from '../constants';
import { errorHandle } from '../services/error';
import { dropToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { FavoriteData } from '../types/favorite-data';
import { Film } from '../types/film';
import { Review } from '../types/review';
import { ReviewData } from '../types/review-data';
import { AppDispatch, State } from '../types/state';
import { UserData } from '../types/user-data';

export const fetchFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'content/fetchFilms',
  async (_arg, {dispatch, extra: api}) => {
    try {
      dispatch(changeLoadingStatus(true));
      const {data} = await api.get<Film[]>(ApiRoute.Films);
      dispatch(loadFilms(data));
      dispatch(filterFilms());
      dispatch(changeLoadingStatus(false));
    } catch (err) {
      errorHandle(err);
      dispatch(changeLoadingStatus(false));
    }
  },
);

export const fetchPromoFilmAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'content/fetchPromoFilm',
  async (_arg, {dispatch, extra: api}) => {
    try {
      dispatch(changeLoadingStatus(true));
      const {data} = await api.get<Film>(ApiRoute.Promo);
      dispatch(loadPromoFilm(data));
      dispatch(changeLoadingStatus(false));
    } catch (err) {
      errorHandle(err);
      dispatch(changeLoadingStatus(false));
    }
  },
);

export const fetchReviewsAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'content/fetchReviews',
  async (id: number, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Review[]>(`${ApiRoute.Comments}/${id}`);
      dispatch(loadReviews(data));
    } catch (err) {
      errorHandle(err);
    }
  },
);

export const fetchSimilarFilmsAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'content/fetchSimilarFilms',
  async (id: number, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Film[]>(`${ApiRoute.Films}/${id}${ApiRoute.Similar}`);
      dispatch(loadSimilarFilms(data));
    } catch (err) {
      errorHandle(err);
    }
  },
);

export const fetchFavoriteFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'content/fetchFavoriteFilms',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Film[]>(`${ApiRoute.Favorites}`);
      dispatch(loadFavoriteFilms(data));
    } catch (err) {
      errorHandle(err);
    }
  },
);

export const postReviewAction = createAsyncThunk<void, ReviewData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'content/postReview',
  async ({filmId, ...review}: ReviewData, {dispatch, extra: api}) => {
    try {
      dispatch(changeLoadingStatus(true));
      const {data} = await api.post<Review[]>(`${ApiRoute.Comments}/${filmId}`, {...review});
      dispatch(loadReviews(data));
      dispatch(changeLoadingStatus(false));
      dispatch(redirectToRoute(`${AppRoute.Films}/${filmId}`));
      toast.success(Message.ReviewSent);
    } catch (err) {
      errorHandle(err);
      dispatch(changeLoadingStatus(false));
    }
  },
);

export const changeFavoriteStatusAction = createAsyncThunk<void, FavoriteData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'content/changeFavoriteStatus',
  async ({filmId, status}: FavoriteData, {dispatch, extra: api}) => {
    try {
      dispatch(changeLoadingStatus(true));
      const {data} = await api.post<Film>(`${ApiRoute.Favorites}/${filmId}/${status}`);
      dispatch(replaceFilm(data));
      dispatch(loadFavoriteFilms([]));
      dispatch(redirectToRoute(AppRoute.MyList));
      dispatch(changeLoadingStatus(false));
      status
        ? toast.success(Message.FavoriteAdded)
        : toast.success(Message.FavoriteRemoved);
    } catch (err) {
      errorHandle(err);
      dispatch(changeLoadingStatus(false));
    }
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data: {token, ...user}} = await api.get(ApiRoute.Login);
      dispatch(changeAuthStatus(AuthorizationStatus.Auth));
      dispatch(loadInfo(user));
    } catch(err) {
      errorHandle(err);
      dispatch(changeAuthStatus(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({email, password}: AuthData, {dispatch, extra: api}) => {
    try {
      const {data: {token, ...user}} = await api.post<UserData>(ApiRoute.Login, {email, password});
      saveToken(token);
      dispatch(changeAuthStatus(AuthorizationStatus.Auth));
      dispatch(loadInfo(user));
      dispatch(redirectToRoute(AppRoute.Main));
    } catch (err) {
      errorHandle(err);
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.delete(ApiRoute.Logout);
      dropToken();
      dispatch(changeAuthStatus(AuthorizationStatus.NoAuth));
      dispatch(loadInfo(null));
      toast.success(Message.LoggedOut);
    } catch (err) {
      errorHandle(err);
    }
  },
);
