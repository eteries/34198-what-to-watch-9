import {createAction} from '@reduxjs/toolkit';

export const loadFilms = createAction('films/load');

export const loadReviews = createAction('films/loadReviews');

export const changeGenre = createAction<string>('films/changeGenre');

export const filterFilms = createAction('films/filter');
