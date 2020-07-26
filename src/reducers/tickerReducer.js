import _ from 'lodash'

import {FETCH_TICKERS, FETCH_TICKER} from '../actions/types'

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_TICKERS:
      return {...state, ..._.mapKeys(action.payload.data, 'symbol')}
    case FETCH_TICKER:
      return {...state, [action.payload.data.symbol]: action.payload.data}
    default:
      return state
  }
}
