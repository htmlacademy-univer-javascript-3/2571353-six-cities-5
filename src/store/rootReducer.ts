import {combineReducers} from '@reduxjs/toolkit';
import {userReducer} from './reducers/userReducer.ts';
import {cityReducer} from './reducers/cityReducer.ts';
import {offersReducer} from './reducers/offersReducer.ts';
import {offerReducer} from './reducers/offerReducer.ts';
import {commentsReducer} from './reducers/commentsReducer.ts';
import {Actions} from '../utils/const.ts';


const rootReducer = combineReducers({
  [Actions.User]: userReducer,
  [Actions.City]: cityReducer,
  [Actions.Offers]: offersReducer,
  [Actions.Offer]: offerReducer,
  [Actions.Comment]: commentsReducer,
});

export {rootReducer};
