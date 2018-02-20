import React, { Component } from 'react';
import LoginForm from '../components/login/LoginForm';

import { login } from '../actions/index';

class Login extends Component {

  state = {
    email: '',
    password: '',
    errorMsg: ''
  }

  handleChange = (e, { name, value }) => {
    this.setState({
      [name]: value
    });
  }

  handleSubmit = () => {
    const userObj = {
      username: this.state.email, 
      password: this.state.password
    };
    login(userObj).then(token => {
      console.log('Successfully logged in');
      console.log(token);
      //TODO
      //redirect back to home page.
      //Home page should now be blank and user can add stuff
    }).catch(err => {
      this.setState({
        errorMsg: err
      })
    });
  }

  render() {
    return (
      <LoginForm 
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        errorMsg={this.state.errorMsg}
      />
    )
  }
}

export default Login;