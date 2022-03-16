import { api, store } from './index';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { loadFilms } from './actions';

import { ApiRoutes } from '../constants';
import { Film } from '../types/film';

export const fetchQuestionAction = createAsyncThunk(
  'data/fetchFilms',
  async () => {
    const {data} = await api.get<Film[]>(ApiRoutes.Films);
    store.dispatch(loadFilms(data));
  },
);
