import { api, store } from './index';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { filterFilms, loadFilms, loadReviews } from './actions';

import { ApiRoutes } from '../constants';
import { Film } from '../types/film';
import { Review } from '../types/review';

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
