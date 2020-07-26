import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions';
import AuthForm from './AuthForm';

const initialize = { username: '', password: '' };

const Login = (props) => {
  const onSubmit = (formValues) => {
    props.login(formValues);
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

const mapStateToProps = (state, ownProps) => ({
  errorMsg: state.auth.errorMessage,
});

export default connect(mapStateToProps, { login })(Login);
