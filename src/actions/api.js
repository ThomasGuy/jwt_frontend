import fetchClient from '../apis/bfx_tickers';
import { FETCH_TICKERS, UPDATE_TICKER, REQUEST_TICKERS, FAIL_TICKERS } from './types';

let bfx = fetchClient();

const requestTickers = () => ({ type: REQUEST_TICKERS });

export const fetchTickers = () => async dispatch => {
  dispatch(requestTickers());
  const response = await bfx.get('/api/tickers');
  if (response.data.status === 'success') {
    dispatch({ type: FETCH_TICKERS, payload: response.data });
  } else {
    dispatch({ type: FAIL_TICKERS, payload: response.data });
  }
};

export const updateTicker = payload => dispatch => {
  dispatch({ type: UPDATE_TICKER, payload: payload.data });
};
