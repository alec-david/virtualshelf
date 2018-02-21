import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProfileView from '../components/profile/ProfileView';

class Profile extends Component {

  render() {
    console.log(this.props);
    return (
      <ProfileView />
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Profile)