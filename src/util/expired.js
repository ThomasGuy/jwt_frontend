import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';

import { refreshToken } from '../actions';

export const expired = (props) => {
  const { auth, refresh, refreshToken } = props;
  if (jwtDecode(auth).exp < new Date().getTime()) {
    refreshToken(refresh);
    return auth;
  }
  return auth;
};

const mapStateToProps = (state) => ({
  auth: state.auth.authToken,
  refresh: state.auth.refreshToken,
});

export default connect(mapStateToProps, { refreshToken })(expired);
