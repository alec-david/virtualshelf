import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProfileView from '../components/profile/ProfileView';
import ProfileDelete from '../components/profile/ProfileDelete';
import ProfileResetPW from '../components/profile/ProfileResetPW';

import { logout, deleteAccount, resetPassword } from '../actions/index';

class Profile extends Component {

  state = {
    reset: false,
    delete: false,
    oldPassword: '',
    newPassword: '',
    reEnterNewPassword: '',
    error: ''
  }

  handleChange = (e, { name, value }) => {
    this.setState({
      [name]: value
    });
  }

  logout = () => {
    this.props.dispatch(logout());
    this.props.router.history.replace('/');
  }

  updatePassword = () => {
    this.setState({
      reset: true,
      oldPassword: ''
    });
  }

  resetPassword = () => {
    if (this.state.newPassword !== this.state.reEnterNewPassword) {
      this.setState({
        error: 'Passwords do not match.',
        oldPassword: '',
        newPassword: '',
        reEnterNewPassword: ''
      });
    } else {
      const userObj = {
        email: this.props.user.email,
        oldPassword: this.state.oldPassword,
        newPassword: this.state.newPassword
      }

      resetPassword(userObj).then(result => {
        this.props.dispatch(result);
        this.setState({
          reset: false,
          delete: false,
          oldPassword: '',
          newPassword: '',
          reEnterNewPassword: '',
          error: ''
        })
      }).catch(err => {
        this.setState({
          error: err,
          oldPassword: '',
          newPassword: '',
          reEnterNewPassword: ''
        })
      })
    }
  }

  deleteAccount = () => {
    this.setState({
      delete: true
    });
  }

  confirmDelete = () => {
    const userObj = {
      email: this.props.user.email,
      password: this.state.oldPassword
    }

    deleteAccount(userObj).then(result => {
      this.props.dispatch(result);
      this.props.router.history.replace('/');
    }).catch(err => {
      this.setState({
        error: err
      });
    })
  }

  cancel = (name) => {
    this.setState({
      [name]: false,
      oldPassword: '',
      newPassword: '',
      reEnterNewPassword: '',
      error: ''
    });
  }


  render() {
    if (this.state.reset) {
      return (
        <ProfileResetPW
          email={this.props.user.email}
          state={this.state}
          handleChange={this.handleChange}
          resetPassword={this.resetPassword}
          cancel={this.cancel}
        />
      )
    } else if (this.state.delete) {
      return (
        <ProfileDelete
          email={this.props.user.email}
          password={this.state.oldPassword}
          error={this.state.error}
          handleChange={this.handleChange}
          confirmDelete={this.confirmDelete}
          cancel={this.cancel}
        />
      )
    }
    return (
      <ProfileView
        email={this.props.user.email}
        logout={this.logout}
        updatePassword={this.updatePassword}
        deleteAccount={this.deleteAccount}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Profile)