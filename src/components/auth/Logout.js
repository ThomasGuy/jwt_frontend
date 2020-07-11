import React from 'react';
import { connect } from 'react-redux';

import { logout } from '../../actions';

const Logout = (props) => {
  return (
    <div className="item button" onClick={() => props.logout()}>
      Logout
    </div>
  );
};

// const mapStateToProps = (state) => ({
//   auth: state.auth.authToken,
// });

export default connect(null, { logout })(Logout);
