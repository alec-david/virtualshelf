import React, { Component } from 'react';
import { connect } from 'react-redux';

import ResetPasswordForm from '../components/resetPassword/ResetPasswordForm';

class ResetPassword extends Component {
  state = {
    email: '',
    errorMsg: ''
  };

  handleChange = (e, { name, value }) => {
    this.setState({
      [name]: value
    });
  };

  handleSubmit = () => {
    this.setState({
      errorMsg: 'LMAOOOO'
    });
  };

  render() {
    return (
      <ResetPasswordForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        formVals={this.state}
      />
    );
  }
}

export default connect()(ResetPassword);
