import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { toast } from 'react-toastify';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';

import { redirectToRoute } from './actions';
import { changeLoadingStatus } from './app-management/app-management';
import {
  changeFavoriteStatusAction,
  checkAuthAction,
  fetchFavoriteFilmsAction,
  fetchFilmsAction,
  fetchPromoFilmAction,
  fetchReviewsAction,
  fetchSimilarFilmsAction,
  loginAction,
  logoutAction,
  postReviewAction
} from './async-actions';
import {
  loadFavoriteFilms,
  loadFilms,
  loadPromoFilm,
  loadReviews,
  loadSimilarFilms,
  replaceFilm
} from './content-management/content-management';
import { changeAuthStatus } from './user-management/user-management';

import { ApiCommand, ApiRoute, HTTP_CODE } from '../constants';
import { AuthData } from '../types/auth-data';
import { createAPI } from '../services/api';
import { FavoriteData } from '../types/favorite-data';
import { ReviewData } from '../types/review-data';
import { State } from '../types/state';
import { createMockFilm, createMockReview } from '../utils/mocks';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should dispatch LoadFilms and ChangeLoadingStatus on GET films', async () => {
    const mockFilms = [createMockFilm(), createMockFilm()];
    mockAPI
      .onGet(ApiRoute.Films)
      .reply(HTTP_CODE.OK, mockFilms);
    const store = mockStore({APP: {isLoading: false}});

    await store.dispatch(fetchFilmsAction());

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(loadFilms.toString());
    expect(actions).toContain(changeLoadingStatus.toString());
    expect(store.getState()).toEqual({APP: {isLoading: false}});
  });

  it('should start and finish loading on GET films (success)', async () => {
    const mockFilms = [createMockFilm(), createMockFilm()];
    mockAPI
      .onGet(ApiRoute.Films)
      .reply(HTTP_CODE.OK, mockFilms);
    const store = mockStore({APP: {isLoading: false}});

    await store.dispatch(fetchFilmsAction());

    expect(store.getState()).toEqual({APP: {isLoading: false}});
  });

  it('should start and finish loading on GET films (error)', async () => {
    mockAPI
      .onGet(ApiRoute.Films)
      .networkError();
    const store = mockStore({APP: {isLoading: false}});

    await store.dispatch(fetchFilmsAction());

    expect(store.getState()).toEqual({APP: {isLoading: false}});
  });

  it('should call a toaster on GET /films error', async () => {
    mockAPI
      .onGet(ApiRoute.Films)
      .networkError();
    const store = mockStore();
    const spy = jest.spyOn(toast, 'error');

    await store.dispatch(fetchFilmsAction());

    expect(spy).toBeCalled();
  });

  it('should dispatch LoadPromoFilm and ChangeLoadingStatus on GET promo', async () => {
    const mockPromoFilm = createMockFilm();
    mockAPI
      .onGet(ApiRoute.Promo)
      .reply(HTTP_CODE.OK, mockPromoFilm);
    const store = mockStore({APP: {isLoading: false}});

    await store.dispatch(fetchPromoFilmAction());

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(loadPromoFilm.toString());
    expect(actions).toContain(changeLoadingStatus.toString());
    expect(store.getState()).toEqual({APP: {isLoading: false}});
  });

  it('should dispatch LoadReviews on GET reviews', async () => {
    const mockReviews = [createMockReview(), createMockReview()];
    const mockId = 1;
    mockAPI
      .onGet(`${ApiRoute.Comments}/${mockId}`)
      .reply(HTTP_CODE.OK, mockReviews);
    const store = mockStore();

    await store.dispatch(fetchReviewsAction(mockId));

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(loadReviews.toString());
  });

  it('should dispatch LoadSimilarFilms on GET similar', async () => {
    const mockFilms = [createMockFilm(), createMockFilm()];
    const mockId = 1;
    mockAPI
      .onGet(`${ApiRoute.Films}/${mockId}${ApiRoute.Similar}`)
      .reply(HTTP_CODE.OK, mockFilms);
    const store = mockStore();

    await store.dispatch(fetchSimilarFilmsAction(mockId));

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(loadSimilarFilms.toString());
  });

  it('should dispatch LoadFavoritesFilms on GET favorites', async () => {
    const mockFilms = [createMockFilm(), createMockFilm()];
    mockAPI
      .onGet(ApiRoute.Favorites)
      .reply(HTTP_CODE.OK, mockFilms);
    const store = mockStore();

    await store.dispatch(fetchFavoriteFilmsAction());

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(loadFavoriteFilms.toString());
  });

  it('should dispatch PostReviewAction, ChangeLoadingStatus, RedirectToRoute and call a toaster on POST review', async () => {
    const mockReviews = [createMockReview(), createMockReview()];
    const mockId = 1;
    const mockReviewData: ReviewData = {
      filmId: mockId,
      rating: 5,
      comment: 'mock-review',
    };
    mockAPI
      .onPost(`${ApiRoute.Comments}/${mockId}`)
      .reply(HTTP_CODE.OK, mockReviews);
    const store = mockStore({APP: {isLoading: false}});
    const spy = jest.spyOn(toast, 'success');

    await store.dispatch(postReviewAction(mockReviewData));

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(loadReviews.toString());
    expect(actions).toContain(changeLoadingStatus.toString());
    expect(actions).toContain(redirectToRoute.toString());
    expect(store.getState()).toEqual({APP: {isLoading: false}});
    expect(spy).toBeCalled();
  });

  it('should dispatch LoadFavoriteFilms, ChangeLoadingStatus, RedirectToRoute, ReplaceFilm and call a toaster on POST favorites', async () => {
    const mockFilm = createMockFilm();
    mockFilm.isFavorite = true;
    const mockId = 1;
    const mockFavoriteData: FavoriteData = {
      filmId: mockId,
      status: ApiCommand.Remove,
    };
    mockAPI
      .onPost(`${ApiRoute.Favorites}/${mockFavoriteData.filmId}/${mockFavoriteData.status}`)
      .reply(HTTP_CODE.OK, mockFilm);
    const store = mockStore({APP: {isLoading: false}});
    const spy = jest.spyOn(toast, 'success');

    await store.dispatch(changeFavoriteStatusAction(mockFavoriteData));

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(loadFavoriteFilms.toString());
    expect(actions).toContain(replaceFilm.toString());
    expect(actions).toContain(changeLoadingStatus.toString());
    expect(actions).toContain(redirectToRoute.toString());
    expect(store.getState()).toEqual({APP: {isLoading: false}});
    expect(spy).toBeCalled();
  });

  it('should set authorization status to «auth» when server return 200 ok', async () => {
    const store = mockStore();
    mockAPI
      .onGet(ApiRoute.Login)
      .reply(HTTP_CODE.OK, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(changeAuthStatus.toString());
  });

  it('should dispatch ChangeAuthStatus and RedirectToRoute when POST login', async () => {
    const mockUser: AuthData = {email: 'mock-email', password: 'mock-password'};

    mockAPI
      .onPost(ApiRoute.Login)
      .reply(HTTP_CODE.OK, {token: 'mock-token'});


    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(mockUser));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(changeAuthStatus.toString());

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('wtw-token', 'mock-token');
  });

  it('should dispatch Logout when Delete /logout', async () => {
    mockAPI
      .onDelete(ApiRoute.Logout)
      .reply(HTTP_CODE.NO_CONTENT);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(changeAuthStatus.toString());

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('wtw-token');
  });
});
