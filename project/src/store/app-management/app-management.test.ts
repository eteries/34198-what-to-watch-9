import { appManagement, changeLoadingStatus } from './app-management';

describe('Reducer: appManagement', () => {
  it('without additional parameters should return initial state', () => {
    expect(appManagement.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        isLoading: false,
      });
  });
  it('should change loading status', () => {
    const initialState = {
      isLoading: false,
    };
    expect(appManagement.reducer(initialState, changeLoadingStatus(true)))
      .toEqual({
        isLoading: true,
      });
  });
});
