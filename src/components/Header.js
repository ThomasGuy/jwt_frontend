import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import Logout from './auth/Logout'

const renderHeader = props => {
  if (props.isSignedIn) {
    return (
      <div className="ui secondary pointing menu">
        <Link to="/" className="item">
          Home
        </Link>
        <Link to="/Bfxapi" className="item">
          Bfxapi
        </Link>
        <Link to="/profile" className="item right floated">
          Profile
        </Link>
        <Logout />
      </div>
    )
  }
  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
        Home
      </Link>
      <Link to="/auth/login" className="item right floated">
        Login
      </Link>
      <Link to="/auth/register" className="item">
        Register
      </Link>
    </div>
  )
}

const Header = props => renderHeader(props)

const mapStateToProps = state => {
  return {isSignedIn: state.auth.isAuthenticated}
}

export default connect(mapStateToProps)(Header)
