import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';

import { checkAuthAction } from './async-actions';
import { changeAuthStatus } from './user-management/user-management';

import { ApiRoute } from '../constants';
import { createAPI } from '../services/api';
import { State } from '../types/state';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should set authorization status to «auth» when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(ApiRoute.Login)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(changeAuthStatus.toString());
  });
});
