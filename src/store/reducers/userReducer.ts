import {createReducer} from '@reduxjs/toolkit';
import {clearUserData, setAuthorizationStatus, setUserData} from '../action.ts';
import {TUserFull} from '../../utils/types.ts';


type UserState = {
  authorizationStatus: boolean;
  userData?: TUserFull;
};

const initialState: UserState = {
  authorizationStatus: false,
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    })
    .addCase(clearUserData, (state) => {
      state.userData = undefined;
    });
});

export {userReducer};
