import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { requestLogin } from '../../actions';

class Login extends Component {
  renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };

  renderInput = ({ input, meta, placeholder, autoComplete, type }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <input {...input} autoComplete={autoComplete} placeholder={placeholder} type={type} />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = (formValues) => {
    // const initialValue = { username: '', password: '' };
    this.props.requestLogin(formValues);
    // this.props.initialValues = initialValue;
  };

  render() {
    const { errorMsg } = this.props;
    return (
      <>
        <h2 className="header">User login</h2>
        {errorMsg && <div className="ui error message">{errorMsg}</div>}
        <br />
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
          <Field
            name="username"
            component={this.renderInput}
            placeholder="username"
            autoComplete="on"
            type="text"
          />
          <Field
            name="password"
            component={this.renderInput}
            placeholder="password"
            autoComplete="off"
            type="password"
          />
          <button className="ui button primary" type="submit">
            Submit
          </button>
        </form>
      </>
    );
  }
}

const validate = ({ username, password }) => {
  const errors = {};
  if (!username) errors.username = 'username must consist of letters and/or numbers';
  if (!password) errors.password = 'please enter a password';

  return errors;
};

const formWrapped = reduxForm({
  form: 'login',
  validate,
})(Login);

const mapStateToProps = (state) => ({
  errorMsg: state.auth.errorMessage,
});

export default connect(mapStateToProps, { requestLogin })(formWrapped);
