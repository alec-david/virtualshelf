import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';

import LoginForm from '../components/login/LoginForm';
import { login } from '../actions/user';
import { updateActiveItem } from '../actions/nav';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errorMsg: ''
  };

  handleChange = (e, { name, value }) => {
    this.setState({
      [name]: value
    });
  };

  handleSubmit = () => {
    const userObj = {
      username: this.state.email,
      password: this.state.password
    };
    //Call login action with username and password
    login(userObj)
      .then(token => {
        //If successful, set user state and navigate back to home page.
        this.props.dispatch(token);
        this.props.router.history.replace('/');
        this.props.dispatch(updateActiveItem('home'));
        toastr.info('Logged in!');
      })
      .catch(err => {
        //If error occurs in login, display error message to user
        //If incorrect password, don't reset email
        if (err.toLowerCase().indexOf('password') !== -1) {
          this.setState({
            errorMsg: err,
            password: ''
          });
        } else {
          //If email not found, reset both
          this.setState({
            errorMsg: err,
            email: '',
            password: ''
          });
        }
      });
  };

  forgotPassword = () => {
    this.props.router.history.push('/reset_password');
    this.props.dispatch(updateActiveItem('login'));
  };

  linkToRegisterPage = () => {
    this.props.router.history.push('/register');
    this.props.dispatch(updateActiveItem('register'));
  };

  render() {
    return (
      <LoginForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        forgotPassword={this.forgotPassword}
        registerLink={this.linkToRegisterPage}
        formVals={this.state}
      />
    );
  }
}

export default connect()(Login);
