import { configureMockStore } from '@jedmao/redux-mock-store';
import { AnyAction } from 'redux';

import { redirect } from './redirect';

import { redirectToRoute } from '../actions';

import { AppRoute } from '../../constants';
import { State } from '../../types/state';

const fakeHistory = {
  location: {pathname: ''},
  push(path: string) {
    this.location.pathname = path;
  },
};

jest.mock('../../services/browser-history', () => fakeHistory);

const middlewares = [redirect];
const mockStore = configureMockStore<State, AnyAction>(middlewares);
const store = mockStore();

describe('Middleware: redirect', () => {
  beforeEach(() => {
    fakeHistory.push('');
  });

  it('should redirect to a correct path with a correct action', () => {
    store.dispatch(redirectToRoute(AppRoute.Main));
    expect(fakeHistory.location.pathname).toBe(AppRoute.Main);
    expect(store.getActions()).toEqual([
      redirectToRoute(AppRoute.Main),
    ]);

    store.dispatch(redirectToRoute(AppRoute.SignIn));
    expect(fakeHistory.location.pathname).toBe(AppRoute.SignIn);
    expect(store.getActions()).toContainEqual(
      redirectToRoute(AppRoute.SignIn),
    );
  });

  it('should not redirect to a correct path with an incorrect action', () => {
    store.dispatch({type: 'UNKNOWN_ACTION', payload: AppRoute.SignIn});
    expect(fakeHistory.location.pathname).not.toBe(AppRoute.SignIn);
  });
});
