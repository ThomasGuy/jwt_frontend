import bfx from '../apis/bfx_tickers';
import {
  FETCH_TICKERS,
  FETCH_TICKER,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  REFRESHED,
} from './types';
import history from '../history';

function authorize2(auth) {
  return {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  };
}

export const fetchTickers = (auth) => async (dispatch) => {
  const response = await bfx.get('/api/tickers', authorize2(auth));
  dispatch({ type: FETCH_TICKERS, payload: response.data });
};

export const fetchTicker = (symbol, auth) => async (dispatch) => {
  const response = await bfx.post('/api/symbols', symbol, authorize2(auth));
  dispatch({ type: FETCH_TICKER, payload: response.data });
};

export const requestLogin = (creds) => async (dispatch) => {
  try {
    const response = await bfx.post('/auth/login', creds);
    if (response.data.status === 'fail') {
      dispatch({ type: LOGIN_FAILURE, payload: response.data });
      history.push('/auth/login');
    } else {
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
      history.push('/bfxapi');
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const requestLogout = (auth) => async (dispatch) => {
  try {
    const response = await bfx.get('/auth/logout', authorize2(auth));
    dispatch({ type: LOGOUT_SUCCESS, payload: response.data });
    history.push('/');
  } catch (error) {
    console.log(error.message);
  }
};

export const refreshToken = (refresh) => async (dispatch) => {
  try {
    const response = await bfx.post('/auth/refresh', authorize2(refresh));
    dispatch({ type: REFRESHED, payload: response.data });
  } catch (error) {
    console.log(error.message);
  }
};
