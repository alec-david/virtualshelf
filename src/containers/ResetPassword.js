import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import * as pbkdf2Password from 'pbkdf2-password';

import ResetPasswordForm from '../components/resetPassword/ResetPasswordForm';
import ResetPasswordEmailForm from '../components/resetPassword/ResetPasswordEmailForm';

import { logout, resetPasswordEmail, resetPassword } from '../actions/user';
import { updateActiveItem } from '../actions/nav';

const hash = pbkdf2Password();

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
        this.props.dispatch(updateActiveItem('home'));
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

    const params = this.props.router.location.search.split('&');
    const token = params[0].split('=')[1];
    const email = params[1].split('=')[1];

    hash({ password: this.state.newPassword, salt: email }, (err, pass, salt, hash) => {
      const userObj = {
        token,
        newPassword: hash
      };

      resetPassword(userObj)
        .then(result => {
          this.setState({
            email: '',
            errorMsg: '',
            newPassword: '',
            reEnterPassword: ''
          });
          this.props.dispatch(result);
          toastr.success('Success', 'Updated Password');
          this.props.router.history.replace('/');
          this.props.dispatch(updateActiveItem('home'));
        })
        .catch(err => {
          this.setState({
            errorMsg: err,
            newPassword: '',
            reEnterPassword: ''
          });
        });
    });
  };

  cancel = () => {
    this.props.router.history.replace('/login');
    this.props.dispatch(updateActiveItem('login'));
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
          cancel={this.cancel}
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
