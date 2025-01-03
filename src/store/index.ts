import {configureStore} from '@reduxjs/toolkit';
import {createAPI} from '../api/api.ts';
import {rootReducer} from './root-reducer.ts';

export const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
