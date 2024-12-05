import {configureStore} from '@reduxjs/toolkit';
import {reducer} from './reducer';
import {createAPI} from '../api/api.ts';

export const api = createAPI();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
