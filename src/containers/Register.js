import React, { Component } from 'react';
import { connect } from 'react-redux';

import RegisterForm from '../components/register/RegisterForm';
import { register } from '../actions/user';
import { updateActiveItem } from '../actions/nav';

class Register extends Component {
  state = {
    email: '',
    password: '',
    reEnterPassword: '',
    errorMsg: '',
    errorBody: ''
  };

  handleChange = (e, { name, value }) => {
    this.setState({
      [name]: value
    });
  };

  handleSubmit = () => {
    if (this.state.password.length < 8) {
      this.setState({
        errorMsg: 'Password must be at least 8 characters',
        password: '',
        reEnterPassword: ''
      });
      return;
    } else if (this.state.password !== this.state.reEnterPassword) {
      this.setState({
        errorMsg: 'Passwords do not match',
        password: '',
        reEnterPassword: ''
      });
      return;
    }
    const userObj = {
      username: this.state.email,
      password: this.state.password
    };
    //If passwords match, call register action
    register(userObj)
      .then(token => {
        //If register successful in DB, dispatch action
        //to update user state with token and navigate to homepage
        this.props.dispatch(token);
        this.props.router.history.replace('/');
      })
      .catch(err => {
        if (err.indexOf('.') !== -1) {
          let errSplit = err.split('.');
          this.setState({
            errorMsg: errSplit[0],
            errorBody: errSplit[1],
            password: '',
            reEnterPassword: ''
          });
        } else {
          this.setState({
            errorMsg: err,
            password: '',
            reEnterPassword: ''
          });
        }
      });
  };

  loginLink = () => {
    this.props.router.history.push('/login');
    this.props.dispatch(updateActiveItem('login'));
  };

  render() {
    return (
      <RegisterForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        formVals={this.state}
        loginLink={this.loginLink}
      />
    );
  }
}
export default connect()(Register);
