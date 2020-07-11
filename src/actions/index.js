import bfx from '../apis/bfx_tickers';
import history from '../history';
import { FETCH_TICKERS, FETCH_TICKER, API_REQUEST, API_SUCCESS, API_FAIL } from './types';

import { login, logout, refreshToken } from './auth';
export { login, logout, refreshToken };

export const fetchTickers = () => async (dispatch) => {
  const response = await bfx.get('/api/tickers');
  dispatch({ type: FETCH_TICKERS, payload: response.data });
};

export const fetchTicker = (symbol) => async (dispatch) => {
  const response = await bfx.post('/api/symbols', symbol);
  dispatch({ type: FETCH_TICKER, payload: response.data });
};

function apiRequest() {
  return {
    type: API_REQUEST,
  };
}

function apiSuccess(data) {
  return {
    type: API_SUCCESS,
    payload: data,
  };
}

function apiFail(data) {
  return {
    type: API_FAIL,
    payload: data,
  };
}

export const fetchProfile = () => async (dispatch) => {
  dispatch(apiRequest());
  const response = await bfx.get('/protected');
  if (response.data.status === 'success') {
    dispatch(apiSuccess(response.data));
  } else {
    dispatch(apiFail(response.data));
    history.push('/bfxapi');
  }
};
