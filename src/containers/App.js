import React, { Component } from 'react';
import createHistory from 'history/createBrowserHistory';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import NavigationBar from './NavigationBar';
import { loginToken, logout } from '../actions/user';
import { updateActiveItem } from '../actions/nav';

const history = createHistory();

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
          console.log(err);
        });
    } else {
      this.props.dispatch(logout());
    }
  };

  setActiveItemNav = () => {
    const currentURL = window.location.href;
    const currentRoute = currentURL.substring(currentURL.lastIndexOf('/') + 1);
    console.log(currentRoute ? currentRoute : 'home');
    this.props.dispatch(updateActiveItem(currentRoute ? currentRoute : 'home'));
  };

  render() {
    return (
      <ConnectedRouter history={history}>
        <NavigationBar />
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = state => {
  return { state };
};

export default connect(mapStateToProps)(App);
