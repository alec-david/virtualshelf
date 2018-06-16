import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import * as pbkdf2Password from 'pbkdf2-password';

import ProfileView from '../components/profile/ProfileView';
import ProfileDelete from '../components/profile/ProfileDelete';
import ProfileResetPW from '../components/profile/ProfileResetPW';

import { logout, deleteAccount, resetPassword, resendVerifyEmail } from '../actions/user';
import { updateActiveItem } from '../actions/nav';

const hash = pbkdf2Password();

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
    this.props.dispatch(updateActiveItem('home'));
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
    if (this.state.newPassword < 8) {
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

    hash(
      { password: this.state.oldPassword, salt: this.props.user.email },
      (oldErr, oldPass, oldSalt, oldHash) => {
        hash(
          { password: this.state.newPassword, salt: this.props.user.email },
          (newErr, newPass, newSalt, newHash) => {
            const userObj = {
              token: this.props.user.token,
              oldPassword: oldHash,
              newPassword: newHash
            };

            resetPassword(userObj)
              .then(result => {
                this.props.dispatch({ ...result, verified: this.props.user.verified });
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
          }
        );
      }
    );
  };

  deleteAccount = () => {
    this.setState({
      error: '',
      delete: true
    });
  };

  confirmDelete = e => {
    hash(
      { password: this.state.oldPassword, salt: this.props.user.email },
      (err, pass, salt, hash) => {
        const userObj = {
          email: this.props.user.email,
          password: hash,
          deleteItems: this.state.deleteItems
        };

        deleteAccount(userObj)
          .then(result => {
            this.props.dispatch(result);
            this.props.router.history.replace('/');
            this.props.dispatch(updateActiveItem('home'));
            toastr.error('Success', 'Deleted Account');
          })
          .catch(err => {
            this.setState({
              error: err,
              oldPassword: ''
            });
          });
      }
    );
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
    toastr.success('Success', 'Resent Verification Email');
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
