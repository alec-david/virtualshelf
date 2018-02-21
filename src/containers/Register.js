import React, { Component } from 'react';
import { connect } from 'react-redux';

import RegisterForm from '../components/register/RegisterForm';
import { register } from '../actions/index';

class Register extends Component {
  state = {
    email: '',
    password: '',
    reEnterPassword: '',
    errorMsg: '',
    errorBody: ''
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
        errorMsg: 'Passwords do not match',
        password: '',
        reEnterPassword: ''
      });
    } else {
      const userObj = {
        username: this.state.email,
        password: this.state.password
      };
      //If passwords match, call register action
      register(userObj).then(token => {
        //If register successful in DB, dispatch action
        //to update user state with token and navigate to homepage
        this.props.dispatch(token);
        this.props.router.history.replace('/');
      }).catch(err => {
        if (err.indexOf('.') !== -1) {
          let errSplit = err.split('.');
          this.setState({
            errorMsg: errSplit[0],
            errorBody: errSplit[1],
            password: '',
            reEnterPassword: ''
          })
        } else {
          this.setState({
            errorMsg: err,
            password: '',
            reEnterPassword: ''
          })
        }
      })
    }
  }

  render() {
    return (
      <RegisterForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        formVals={this.state} />
    )
  }
}
export default connect()(Register)