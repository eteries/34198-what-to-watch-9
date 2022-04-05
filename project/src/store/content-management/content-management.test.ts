import {
  changeGenre,
  contentManagement, filterFilms,
  loadFavoriteFilms,
  loadFilms,
  loadPromoFilm,
  loadReviews,
  loadSimilarFilms
} from './content-management';

import { createMockFilm, createMockInitialContentState, createMockReview } from '../../utils/mocks';
import { ALL_GENRES } from '../../constants';
import { ContentManagement } from '../../types/state';

let initialState: ContentManagement;

describe('Reducer: contentManagement', () => {
  beforeEach(() => {
    initialState = createMockInitialContentState();
  });
  it('without additional parameters should return initial state', () => {
    expect(contentManagement.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });
  it('should load films into the store', () => {
    const mockFilms = [createMockFilm(), createMockFilm()];
    expect(contentManagement.reducer(initialState, loadFilms(mockFilms)))
      .toEqual({...initialState, films: mockFilms});
  });
  it('should load similar films into the store', () => {
    const mockFilms = [createMockFilm(), createMockFilm()];
    expect(contentManagement.reducer(initialState, loadSimilarFilms(mockFilms)))
      .toEqual({...initialState, similarFilms: mockFilms});
  });
  it('should load favorite films into the store', () => {
    const mockFilms = [createMockFilm(), createMockFilm()];
    expect(contentManagement.reducer(initialState, loadFavoriteFilms(mockFilms)))
      .toEqual({...initialState, favoriteFilms: mockFilms});
  });
  it('should load promo film into the store', () => {
    const mockFilm = createMockFilm();
    expect(contentManagement.reducer(initialState, loadPromoFilm(mockFilm)))
      .toEqual({...initialState, promoFilm: mockFilm});
  });
  it('should load reviews into the store', () => {
    const mockReviews = [createMockReview(), createMockReview()];
    expect(contentManagement.reducer(initialState, loadReviews(mockReviews)))
      .toEqual({...initialState, reviews: mockReviews});
  });
  it('should change genre', () => {
    const newGenre = 'new genre';
    expect(contentManagement.reducer(initialState, changeGenre(newGenre)))
      .toEqual({...initialState, genre: newGenre});
  });
  it('should filter films with current genre', () => {
    const comedyFilm = {...createMockFilm(), genre: 'comedy'};
    const dramaFilm = {...createMockFilm(), genre: 'drama'};
    initialState.films = [comedyFilm, dramaFilm];
    initialState.genre = 'comedy';

    expect(contentManagement.reducer(initialState, filterFilms()))
      .toEqual({...initialState, filteredFilms: [comedyFilm]});
  });
  it('should not filter films if genre set to ALL', () => {
    const comedyFilm = {...createMockFilm(), genre: 'comedy'};
    const dramaFilm = {...createMockFilm(), genre: 'drama'};
    initialState.films = [comedyFilm, dramaFilm];
    initialState.genre = ALL_GENRES;

    expect(contentManagement.reducer(initialState, filterFilms()))
      .toEqual({...initialState, filteredFilms: [comedyFilm, dramaFilm]});
  });
});
