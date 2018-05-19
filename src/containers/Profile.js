import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';

import ProfileView from '../components/profile/ProfileView';
import ProfileDelete from '../components/profile/ProfileDelete';
import ProfileResetPW from '../components/profile/ProfileResetPW';

import { logout, deleteAccount, resetPassword, resendVerifyEmail } from '../actions/user';

class Profile extends Component {
  state = {
    reset: false,
    delete: false,
    deleteItems: false,
    oldPassword: '',
    newPassword: '',
    reEnterNewPassword: '',
    error: ''
  };

  handleChange = (e, { name, value }) => {
    this.setState({
      [name]: value
    });
  };

  toggleDeleteItems = () => {
    this.setState({
      deleteItems: !this.state.deleteItems
    });
  };

  logout = () => {
    this.props.dispatch(logout());
    this.props.router.history.replace('/');
    toastr.info('Logged out.');
  };

  updatePassword = () => {
    this.setState({
      error: '',
      reset: true,
      oldPassword: ''
    });
  };

  resetPassword = () => {
    if (this.state.password.newPassword < 8) {
      this.setState({
        errorMsg: 'New password must be at least 8 characters',
        newPassword: '',
        reEnterNewPassword: ''
      });
      return;
    } else if (this.state.newPassword !== this.state.reEnterNewPassword) {
      this.setState({
        error: 'Passwords do not match.',
        newPassword: '',
        reEnterNewPassword: ''
      });
      return;
    }
    const userObj = {
      token: this.props.user.token,
      oldPassword: this.state.oldPassword,
      newPassword: this.state.newPassword
    };

    resetPassword(userObj)
      .then(result => {
        this.props.dispatch(result);
        this.setState({
          reset: false,
          delete: false,
          oldPassword: '',
          newPassword: '',
          reEnterNewPassword: '',
          error: ''
        });
        toastr.success('Success', 'Updated Password');
      })
      .catch(err => {
        this.setState({
          error: err,
          oldPassword: '',
          newPassword: '',
          reEnterNewPassword: ''
        });
      });
  };

  deleteAccount = () => {
    this.setState({
      error: '',
      delete: true
    });
  };

  confirmDelete = e => {
    const userObj = {
      email: this.props.user.email,
      password: this.state.oldPassword,
      deleteItems: this.state.deleteItems
    };

    deleteAccount(userObj)
      .then(result => {
        this.props.dispatch(result);
        this.props.router.history.replace('/');
        toastr.error('Success', 'Deleted Account');
      })
      .catch(err => {
        this.setState({
          error: err,
          oldPassword: ''
        });
      });
  };

  cancel = name => {
    this.setState({
      [name]: false,
      oldPassword: '',
      newPassword: '',
      reEnterNewPassword: '',
      error: ''
    });
  };

  resendVerificationEmail = () => {
    resendVerifyEmail(this.props.user.token);
  };

  componentDidUpdate(_, prevState) {
    if (prevState === this.state) {
      this.setState({
        reset: false,
        delete: false,
        oldPassword: '',
        newPassword: '',
        reEnterNewPassword: '',
        error: ''
      });
    }
  }

  render() {
    const { user } = this.props;
    if (this.state.reset) {
      return (
        <ProfileResetPW
          email={user.email}
          state={this.state}
          handleChange={this.handleChange}
          resetPassword={this.resetPassword}
          cancel={this.cancel}
        />
      );
    } else if (this.state.delete) {
      return (
        <ProfileDelete
          email={user.email}
          state={this.state}
          handleChange={this.handleChange}
          confirmDelete={this.confirmDelete}
          cancel={this.cancel}
          toggleDeleteItems={this.toggleDeleteItems}
        />
      );
    }
    return (
      <ProfileView
        user={user}
        logout={this.logout}
        updatePassword={this.updatePassword}
        deleteAccount={this.deleteAccount}
        resendVerificationEmail={this.resendVerificationEmail}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Profile);
