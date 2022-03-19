import {createAction} from '@reduxjs/toolkit';

import { Film } from '../types/film';
import { Review } from '../types/review';

export const loadFilms = createAction<Film[]>('films/load');

export const loadReviews = createAction<Review[]>('films/loadReviews');

export const changeGenre = createAction<string>('films/changeGenre');

export const filterFilms = createAction('films/filter');
