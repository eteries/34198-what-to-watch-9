import { combineReducers } from '@reduxjs/toolkit';

import { NameSpace } from '../constants';
import { appManagement } from './app-management/app-management';
import { contentManagement } from './content-management/content-management';
import { userManagement } from './user-management/user-management';

export const rootReducer = combineReducers({
  [NameSpace.App]: appManagement.reducer,
  [NameSpace.Content]: contentManagement.reducer,
  [NameSpace.User]: userManagement.reducer,
});
