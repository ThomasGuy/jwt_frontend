// reducers.js

import {
  AUTH_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  REFRESH_FAIL,
  REFRESH_SUCCESS,
} from '../actions/types';

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.

const INITIAL_STATE = {
  isAuthenticated: false,
  isFetching: false,
  access_token: '',
  refresh_token: '',
  errorMessage: '',
};

const authReducer = (state = INITIAL_STATE, action) => {
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
      localStorage.setItem('access_token', action.payload.access_token);
      localStorage.setItem('refresh_token', action.payload.refresh_token);
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        access_token: action.payload.access_token,
        refresh_token: action.payload.refresh_token,
        errorMessage: '',
      });
    case LOGOUT_SUCCESS:
      localStorage.clear();
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        access_token: '',
        refresh_token: '',
        errorMessage: action.payload.message,
      });
    case LOGOUT_FAIL:
      localStorage.clear();
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.payload.message,
      });
    case REFRESH_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        access_token: action.payload.access_token,
      });
    case REFRESH_FAIL:
      localStorage.clear();
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
      });
    default:
      return state;
  }
};

export default authReducer;
