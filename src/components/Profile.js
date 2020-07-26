import React from 'react'
import {connect} from 'react-redux'

import {fetchProfile} from '../actions'

class Profile extends React.Component {
  componentDidMount() {
    this.props.fetchProfile()
  }

  renderProfile = () => {
    if (!this.props.profile.current_user) {
      return <div>Loading...</div>
    }
    const {current_user, userId} = this.props.profile
    return (
      <React.Fragment>
        <div className="item" key={'id'}>
          {`User_ID: ${userId}`}
        </div>
        <div
          className="item"
          key={'name'}
        >{`Name   : ${current_user.username}`}</div>
        <div
          className="item"
          key={'email'}
        >{`Email  : ${current_user.email}`}</div>
      </React.Fragment>
    )
  }

  render() {
    return <div className="ui celled list">{this.renderProfile()}</div>
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile,
  }
}

export default connect(mapStateToProps, {fetchProfile})(Profile)
