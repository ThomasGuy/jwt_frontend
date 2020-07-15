import { API_REQUEST, API_SUCCESS, API_FAIL } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case API_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case API_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        userId: action.payload.userId,
        current_user: action.payload.current_user,
        errorMessage: '',
      });
    case API_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.payload.message,
      });
    default:
      return state;
  }
};
