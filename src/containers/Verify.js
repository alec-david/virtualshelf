import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';

import { verifyEmailWithToken } from '../actions/user';

class Verify extends Component {
  componentDidMount() {
    const params = this.props.router.location.search;
    const { user } = this.props.state;

    if (!user.loggingIn && params) {
      const token = params.split('=')[1];
      verifyEmailWithToken(token)
        .then(result => {
          toastr.success('Success!', result);
          this.props.router.history.replace('/');
        })
        .catch(err => {
          toastr.error('Failed to Verify', err);
          this.props.router.history.replace('/');
        });
    }
  }

  render() {
    return <div />;
  }
}

const mapStateToProps = state => {
  return { state };
};

export default connect(mapStateToProps)(Verify);
