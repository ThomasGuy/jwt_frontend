import React from 'react';
import { connect } from 'react-redux';

import { requestLogin } from '../../actions';
import AuthForm from './AuthForm';

const initialize = { username: '', password: '' };

const Login = (props) => {
  const onSubmit = (formValues) => {
    props.requestLogin(formValues);
  };

  const { errorMsg } = props;
  return (
    <>
      <h2 className="header">User login</h2>
      {errorMsg && <div className="ui error message">{errorMsg}</div>}
      <br />
      <AuthForm onSubmit={onSubmit} initialValues={initialize} />
    </>
  );
};

const mapStateToProps = (state) => ({
  errorMsg: state.auth.errorMessage,
});

export default connect(mapStateToProps, { requestLogin })(Login);
