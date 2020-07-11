// reducers.js

import {
  AUTH_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REFRESH_SUCCESS,
  REFRESH_FAIL,
  LOGOUT_FAIL,
} from '../actions/types';

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.

const INITIAL_STATE = {
  isAuthenticated: false,
  isFetching: false,
  authToken: '',
  refreshToken: '',
  errorMessage: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case LOGIN_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.payload.message,
      });
    case LOGIN_SUCCESS:
      localStorage.setItem('authToken', action.payload.auth_token);
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        authToken: action.payload.auth_token,
        refreshToken: action.payload.refresh_token,
        errorMessage: '',
      });
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        authToken: '',
        refreshToken: '',
        errorMessage: action.payload.message,
      });
    case LOGOUT_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.payload.message,
      });
    case REFRESH_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        authToken: action.payload.access_token,
      });
    case REFRESH_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
      });
    default:
      return state;
  }
};
