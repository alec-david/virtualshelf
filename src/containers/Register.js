import React, { Component } from 'react';
import RegisterForm from '../components/register/RegisterForm';

import { register } from '../actions/index';

class Register extends Component {
  state = {
    email: '',
    password: '',
    reEnterPassword: '',
    passwordsMatch: true
  }

  handleChange = (e, { name, value }) => {
    this.setState({
      [name]: value
    });
  }

  handleSubmit = () => {
    //Check passwords here. If not matching, throw an error
    if (this.state.password !== this.state.reEnterPassword) {
      this.setState({
        passwordsMatch: false
      });
    } else {
      const userObj = {
        username: this.state.email, 
        password: this.state.password
      };
      console.log(userObj);
      let asyncRegister = register(userObj);
      asyncRegister.then(token => {
        console.log('asuh');
        console.log(token);
      })
    }
  }

  render() {
    return (
      <RegisterForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        passwordsMatch={this.state.passwordsMatch} />
    )
  }
}

export default Register;