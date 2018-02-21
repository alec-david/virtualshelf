import React, { Component } from 'react';
import createHistory from 'history/createBrowserHistory';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import NavBarNoUser from '../components/NavBar/NavBarNoUser';
import NavBarLoggedIn from '../components/NavBar/NavBarLoggedIn';
import { loginToken } from '../actions/index';

const mapStateToProps = state => {
  return { state };
};

const history = createHistory();

class NavigationBar extends Component {

  //Do something here to check if user has already logged in
  //Look into cookies/localStorage/whatever
  componentWillMount() {
    if (localStorage.token) {
      const checkLocalStorageToken = loginToken(localStorage.token);
      this.props.dispatch(checkLocalStorageToken);
    }
  }

  render() {
    const { user } = this.props.state;
    if (!user.token) {
      return (
        <ConnectedRouter history={history}>
          <NavBarNoUser />
        </ConnectedRouter>
      );
    } else {
      return (
        <ConnectedRouter history={history}>
          <NavBarLoggedIn />
        </ConnectedRouter>
      )
    }
  }
}

export default connect(mapStateToProps)(NavigationBar);
