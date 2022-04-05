import { changeAuthStatus, loadInfo, userManagement } from './user-management';
import { AuthorizationStatus } from '../../constants';
import { createMockUser } from '../../utils/mocks';

describe('Reducer: userManagement', () => {
  it('without additional parameters should return initial state', () => {
    expect(userManagement.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Unknown,
        user: null,
      });
  });
  it('should change authorization status', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null,
    };
    expect(userManagement.reducer(initialState, changeAuthStatus(AuthorizationStatus.Auth)))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        user: null,
      });
  });
  it('should load user into the store', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null,
    };
    const mockUser = createMockUser();
    expect(userManagement.reducer(initialState, loadInfo(mockUser)))
      .toEqual({...initialState, user: mockUser});
  });
});
