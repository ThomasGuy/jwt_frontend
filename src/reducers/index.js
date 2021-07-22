import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import auth from './authReducer';
import tickers from './tickerReducer';
import profile from './profileReducer';

export default combineReducers({
  auth,
  form: formReducer,
  tickers,
  profile,
});
