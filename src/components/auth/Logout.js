import React from 'react';
import { connect } from 'react-redux';

import { requestLogout } from '../../actions';

const Logout = (props) => {
  return (
    <div className="item button right floated" onClick={() => props.requestLogout()}>
      Logout
    </div>
  );
};

export default connect(null, { requestLogout })(Logout);
