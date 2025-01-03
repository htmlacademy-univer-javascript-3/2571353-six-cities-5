import {combineReducers} from '@reduxjs/toolkit';
import {userReducer} from './reducers/user-reducer.ts';
import {cityReducer} from './reducers/city-reducer.ts';
import {offersReducer} from './reducers/offers-reducer.ts';
import {offerReducer} from './reducers/offer-reducer.ts';
import {commentsReducer} from './reducers/comments-reducer.ts';
import {Actions} from '../utils/const.ts';
import {favoritesReducer} from './reducers/favorites-reducer.ts';


const rootReducer = combineReducers({
  [Actions.User]: userReducer,
  [Actions.City]: cityReducer,
  [Actions.Offers]: offersReducer,
  [Actions.Offer]: offerReducer,
  [Actions.Comments]: commentsReducer,
  [Actions.Favorites]: favoritesReducer,
});

export {rootReducer};

export type TRootReducer = ReturnType<typeof rootReducer>;
