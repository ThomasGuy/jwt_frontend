import fetchClient from '../apis/bfx_tickers';
import history from '../history';
import {
  AUTH_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  REFRESH_SUCCESS,
  REFRESH_FAIL,
} from './types';

let bfx = fetchClient();

function requestAuth() {
  return {
    type: AUTH_REQUEST,
  };
}

function loginSuccess(data) {
  return {
    type: LOGIN_SUCCESS,
    payload: data,
  };
}

function loginFail(data) {
  return {
    type: LOGIN_FAIL,
    payload: data,
  };
}
function logoutSuccess(data) {
  return {
    type: LOGOUT_SUCCESS,
    payload: data,
  };
}

function logoutFail(data) {
  return {
    type: LOGOUT_FAIL,
    payload: data,
  };
}
function refreshSuccess(data) {
  return {
    type: REFRESH_SUCCESS,
    payload: data,
  };
}

function refreshFail(data) {
  return {
    type: REFRESH_FAIL,
    payload: data,
  };
}

export const login = creds => async dispatch => {
  try {
    dispatch(requestAuth());
    const response = await bfx.post('/auth/login', creds);
    if (response.data.message) {
      dispatch(loginFail(response.data));
      history.push('/auth/login');
    } else {
      dispatch(loginSuccess(response.data));
      history.push('/bfxapi');
    }
  } catch (error) {
    dispatch(loginFail({ message: error.message }));
    history.push('/auth/login');
    console.log(error.message);
  }
};

export const logout = () => async dispatch => {
  try {
    dispatch(requestAuth());
    const response = await bfx.get('/auth/logout');
    if (response.data.message) {
      dispatch(logoutFail(response.data));
    } else {
      dispatch(logoutSuccess(response.data));
      history.push('/auth/login');
    }
  } catch (error) {
    dispatch(logoutFail({ message: error.message }));
    console.log(error.message);
  }
};

export const refresh = refresh => async dispatch => {
  try {
    dispatch(requestAuth());
    const response = await bfx.post('/auth/refresh');
    if (response.data.access_token) {
      dispatch(refreshSuccess(response.data));
    } else {
      dispatch(refreshFail(response.data));
      history.push('/auth/login');
    }
  } catch (error) {
    dispatch(refreshFail({ message: error.message }));
    history.push('/auth/login');
    console.log(error.message);
  }
};
