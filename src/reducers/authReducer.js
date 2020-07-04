// reducers.js

import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS } from '../actions/types';

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.

const INITIAL_STATE = {
  isAuthenticated: localStorage.getItem('authToken') ? true : false,
  errorMessage: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isAuthenticated: false,
        errorMessage: action.payload.message,
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: true,
        authToken: action.payload.auth_token,
        refreshToken: action.payload.refresh_token,
        errorMessage: '',
      });
    case LOGOUT_SUCCESS:
      localStorage.clear();
      return Object.assign({}, state, {
        isAuthenticated: false,
        authToken: '',
        refreshToken: '',
      });
    default:
      return state;
  }
};