import currentUser from './currentUser';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  currentUser: currentUser
});