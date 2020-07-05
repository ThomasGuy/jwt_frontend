import React from 'react';
import { connect } from 'react-redux';

import { requestLogout } from '../../actions';

const Logout = (props) => {
  return (
    <div className="item button right floated" onClick={() => props.requestLogout(props.auth)}>
      Logout
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth.authToken,
});

export default connect(mapStateToProps, { requestLogout })(Logout);
