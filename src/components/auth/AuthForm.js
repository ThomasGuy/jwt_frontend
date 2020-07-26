import React, {Component} from 'react'
import {Field, reduxForm} from 'redux-form'

class AuthForm extends Component {
  renderError = ({error, touched}) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      )
    }
  }

  renderInput = ({input, meta, placeholder, autoComplete, type}) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`
    return (
      <div className={className}>
        <input
          {...input}
          autoComplete={autoComplete}
          placeholder={placeholder}
          type={type}
        />
        {this.renderError(meta)}
      </div>
    )
  }

  onSubmit = formValues => {
    this.props.onSubmit(formValues)
  }

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
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
    )
  }
}

const validate = formValues => {
  const errors = {}
  if (!formValues.username)
    errors.username = 'username must consist of letters and/or numbers'
  if (!formValues.password) errors.password = 'please enter a password'

  return errors
}

export default reduxForm({
  form: 'login',
  validate,
})(AuthForm)
