import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import * as pbkdf2Password from 'pbkdf2-password';

import LoginForm from '../components/login/LoginForm';
import { login } from '../actions/user';
import { updateActiveItem } from '../actions/nav';

const hash = pbkdf2Password();

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
    hash({ password: this.state.password, salt: this.state.email }, (err, pass, salt, hash) => {
      const userObj = {
        username: this.state.email,
        password: hash
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
