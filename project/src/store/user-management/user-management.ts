import { createSlice } from '@reduxjs/toolkit';

import { NameSpace, AuthorizationStatus} from '../../constants';
import { UserManagement} from '../../types/state';

const initialState: UserManagement = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null
};

export const userManagement = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    changeAuthStatus: (state, action) => {
      state.authorizationStatus = action.payload;
    },
    loadInfo: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { changeAuthStatus, loadInfo } = userManagement.actions;
