import { createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../constants';
import { AppManagement} from '../../types/state';

const initialState: AppManagement = {
  isLoading: false,
};

export const appManagement = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeLoadingStatus: (state, action) => {
      state.isLoading= action.payload;
    },
  },
});

export const { changeLoadingStatus } = appManagement.actions;
