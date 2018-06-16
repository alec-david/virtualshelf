import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import NavigationBar from './NavigationBar';
import { loginToken, logout } from '../actions/user';
import { updateActiveItem } from '../actions/nav';

class App extends Component {
  //Check localStorage to see if user has already created an
  //account. If so, log that user in.
  componentWillMount() {
    this.checkUserToken();
    this.setActiveItemNav();
  }

  checkUserToken = () => {
    if (localStorage.token) {
      loginToken(localStorage.token)
        .then(result => {
          this.props.dispatch(result);
        })
        .catch(err => {
          this.props.dispatch(logout());
        });
    } else {
      this.props.dispatch(logout());
    }
  };

  setActiveItemNav = () => {
    const currentURL = window.location.href;
    const currentRoute = currentURL.substring(currentURL.lastIndexOf('/') + 1);
    this.props.dispatch(updateActiveItem(currentRoute ? currentRoute : 'home'));
  };

  render() {
    const { user } = this.props.state;
    if (user.loggingIn) {
      return <div />;
    }
    return (
      <HashRouter>
        <NavigationBar />
      </HashRouter>
    );
  }
}

const mapStateToProps = state => {
  return { state };
};

export default connect(mapStateToProps)(App);
