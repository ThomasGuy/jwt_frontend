import fetchClient from '../apis/bfx_tickers';
import { FETCH_TICKERS, FETCH_TICKER } from './types';

let bfx = fetchClient();

export const fetchTickers = () => async (dispatch) => {
  const response = await bfx.get('/api/tickers');
  dispatch({ type: FETCH_TICKERS, payload: response.data });
};

export const fetchTicker = (symbol) => async (dispatch) => {
  const response = await bfx.post('/api/symbols', symbol);
  dispatch({ type: FETCH_TICKER, payload: response.data });
};
