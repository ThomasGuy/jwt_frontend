import React from 'react';
import { connect } from 'react-redux';

import { fetchProfile } from '../actions';

class Profile extends React.Component {
  componentDidMount() {
    this.props.fetchProfile();
  }

  renderProfile = () => {
    if (this.props.profile.isFetching) {
      return <div>Loading...</div>;
    }
    const { current_user, userId } = this.props.profile;
    console.log(current_user);
    return (
      <>
        <div>{userId}</div>
        {/* <div>{current_user.email}</div> */}
      </>
    );
  };

  render() {
    return <div className="ui celled list">{this.renderProfile()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  };
};

export default connect(mapStateToProps, { fetchProfile })(Profile);
