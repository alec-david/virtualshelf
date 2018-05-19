import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';

import ResetPasswordForm from '../components/resetPassword/ResetPasswordForm';
import ResetPasswordEmailForm from '../components/resetPassword/ResetPasswordEmailForm';

import { logout, resetPasswordEmail, resetPassword } from '../actions/user';

class ResetPassword extends Component {
  state = {
    email: '',
    errorMsg: '',
    newPassword: '',
    reEnterPassword: ''
  };

  handleChange = (e, { name, value }) => {
    this.setState({
      [name]: value
    });
  };

  handleEmailSubmit = () => {
    resetPasswordEmail(this.state.email)
      .then(result => {
        toastr.success(
          'Success!',
          'An email has been set to your address with instructions on how to reset your password'
        );
        this.props.router.history.replace('/');
      })
      .catch(err => {
        this.setState({
          errorMsg: err
        });
      });
  };

  handlePasswordSubmit = () => {
    if (this.state.newPassword.length < 8) {
      this.setState({
        errorMsg: 'Password must be at least 8 characters',
        newPassword: '',
        reEnterPassword: ''
      });
      return;
    } else if (this.state.newPassword !== this.state.reEnterPassword) {
      this.setState({
        errorMsg: 'Passwords do not match',
        reEnterPassword: ''
      });
      return;
    }
    const params = this.props.router.location.search;
    const token = params.split('=')[1];

    const userObj = {
      token,
      oldPassword: this.state.oldPassword,
      newPassword: this.state.newPassword
    };

    resetPassword(userObj)
      .then(result => {
        this.props.dispatch(result);
        this.setState({
          email: '',
          errorMsg: '',
          newPassword: '',
          reEnterPassword: ''
        });
        toastr.success('Success', 'Updated Password');
        this.props.router.history.replace('/');
      })
      .catch(err => {
        this.setState({
          errorMsg: err,
          newPassword: '',
          reEnterPassword: ''
        });
      });
  };

  componentDidMount() {
    const { user } = this.props.state;
    if (!user.loggingIn && user.email) {
      this.props.dispatch(logout());
    }
  }

  render() {
    const params = this.props.router.location.search;
    if (!params) {
      return (
        <ResetPasswordEmailForm
          handleChange={this.handleChange}
          handleSubmit={this.handleEmailSubmit}
          formVals={this.state}
        />
      );
    }
    return (
      <ResetPasswordForm
        handleChange={this.handleChange}
        handleSubmit={this.handlePasswordSubmit}
        formVals={this.state}
      />
    );
  }
}

const mapStateToProps = state => {
  return { state };
};

export default connect(mapStateToProps)(ResetPassword);
