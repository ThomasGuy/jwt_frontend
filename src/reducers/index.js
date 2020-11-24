import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import auth from './authReducer';
import tickerReducer from './tickerReducer';
import profileReducer from './profileReducer';

export default combineReducers({
  auth,
  form: formReducer,
  tickers: tickerReducer,
  profile: profileReducer,
});
