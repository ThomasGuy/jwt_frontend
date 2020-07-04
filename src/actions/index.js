import bfx from '../apis/bfx_tickers';
import { FETCH_TICKERS, FETCH_TICKER, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS } from './types';
import history from '../history';

function authorize() {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
  };
}

export const fetchTickers = () => async (dispatch) => {
  const response = await bfx.get('/api/tickers', authorize());
  dispatch({ type: FETCH_TICKERS, payload: response.data['data'] });
};

export const fetchTicker = (symbol) => async (dispatch) => {
  const response = await bfx.post('/api/symbols', symbol, authorize());
  dispatch({ type: FETCH_TICKER, payload: response.data['data'] });
};

export const requestLogin = (creds) => async (dispatch) => {
  try {
    const response = await bfx.post('/auth/login', creds);
    if (response.data.status === 'fail') {
      dispatch({ type: LOGIN_FAILURE, payload: response.data });
      history.push('/auth/login');
    } else {
      localStorage.setItem('authToken', response.data.auth_token);
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
      history.push('/bfxapi');
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const requestLogout = () => async (dispatch) => {
  await bfx.post('/auth/logout', authorize());
  dispatch({ type: LOGOUT_SUCCESS });
  history.push('/');
};

export const login = () => (dispatch) => {
  let response = '';
  if (response === 'fail') {
    dispatch({ type: LOGIN_FAILURE });
    history.push('/auth/login');
  } else {
    dispatch({ type: LOGIN_SUCCESS });
    history.push('/bfxapi');
  }
};
