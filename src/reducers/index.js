import { combineReducers } from 'redux';

import tickersReducer from './tickersReducer';

export default combineReducers({
  tickers: tickersReducer,
});
