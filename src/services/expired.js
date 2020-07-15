import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';

import { refresh_token } from '../actions';

export const expired = (props) => {
  const { auth, refresh, refresh_token } = props;
  if (jwtDecode(auth).exp < new Date().getTime()) {
    refresh_token(refresh);
    return auth;
  }
  return auth;
};

const mapStateToProps = (state) => ({
  auth: state.auth.access_token,
  refresh: state.auth.refresh_token,
});

export default connect(mapStateToProps, { refresh_token })(expired);
