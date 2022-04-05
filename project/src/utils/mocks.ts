import { ALL_GENRES } from '../constants';
import { Review } from '../types/review';
import { User } from '../types/user';
import { Film } from '../types/film';
import { ContentManagement } from '../types/state';

export const createMockFilm = (): Film => ({
  id: 777,
  name: 'Mock film',
  posterImage: 'mock poster image',
  previewImage: 'mock preview',
  backgroundImage: 'mock background',
  backgroundColor: '#333333',
  videoLink: 'http://video.com',
  previewVideoLink: 'http://video.com/preview',
  description: 'description',
  rating: 4.2,
  scoresCount: 2,
  director: 'Ivanov',
  starring: ['Petrov', 'Popov', 'Sidorov'],
  runTime: 600,
  genre: 'drama',
  released: 2018,
  isFavorite: false,
});

export const createMockReview = (): Review => ({
  comment: 'Mock comment',
  date: new Date('2000-10-10').toISOString(),
  id: 99,
  rating: 3,
  user: {
    id: 5,
    name: 'John',
    avatarUrl: 'avatar',
    email: 'user@user.ru',
  },
});

export const createMockUser = (): User => ({
  avatarUrl: 'avatar',
  email: 'user@user.ru',
  id: 34,
  name: 'John',
});

export const createMockInitialContentState = (): ContentManagement => ({
  films: [],
  filteredFilms: [],
  reviews: [],
  similarFilms: [],
  favoriteFilms: [],
  promoFilm: null,
  genre: ALL_GENRES,
});
