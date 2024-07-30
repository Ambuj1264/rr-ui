import { combineReducers } from 'redux';
import {reservation,packageReducer } from './reducer';
const rootReducer = combineReducers({
  
  reservation,
  packageReducer
});

export default rootReducer;