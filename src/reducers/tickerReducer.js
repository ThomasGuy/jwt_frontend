import _ from 'lodash';

import { FETCH_TICKERS, FAIL_TICKERS, UPDATE_TICKER, REQUEST_TICKERS } from '../actions/types';

const INITIAL_STATE = {
  pending: false,
  errrorMessage: '',
  coins: {},
};

const tickerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_TICKERS:
      return Object.assign({}, state, {
        pending: true,
      });
    case FAIL_TICKERS:
      return Object.assign({}, state, {
        pending: false,
        errrorMessage: action.payload.message,
      });
    case FETCH_TICKERS:
      return Object.assign({}, state, {
        pending: false,
        coins: _.mapKeys(action.payload.data, 'symbol'),
        errrorMessage: '',
      });
    case UPDATE_TICKER:
      return Object.assign({}, state, {
        coins: {
          ...state.coins,
          [action.payload.symbol]: action.payload.data,
        },
      });
    default:
      return state;
  }
};

export default tickerReducer;
