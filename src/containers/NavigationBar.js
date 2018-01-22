import React, { Component } from 'react';
import createHistory from 'history/createBrowserHistory';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import NavBarNoUser from '../components/NavBar/NavBarNoUser';
import NavBarLoggedIn from '../components/NavBar/NavBarLoggedIn';
import { login } from '../actions/index';

import Auth from '../Auth/Auth';

const auth = new Auth();

const mapStateToProps = state => {
  return { state };
};

const history = createHistory();

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
  }

  login() {
    auth.login();
  }

  handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
      auth.handleAuthentication(this.props.dispatch);
      history.replace('/');
    }
  }

  componentWillMount() {
    if (localStorage.expires_at) {
      let userInfo = {
        access_token: localStorage.access_token,
        id_token: localStorage.id_token,
        expires_at: localStorage.expires_at
      }
      const checkLocalStorageUser = login(userInfo);
      this.props.dispatch(checkLocalStorageUser);
    }
  }

  render() {
    const { user } = this.props.state;
    if (!auth.checkValidUser(user.expires_at)) {
      return (
        <ConnectedRouter history={history}>
          <NavBarNoUser login={this.login} authenticateUser={this.handleAuthentication} />
        </ConnectedRouter>
      );
    }
    return (
      <ConnectedRouter history={history}>
        <NavBarLoggedIn auth={auth} />
      </ConnectedRouter>
    )
  }
}

export default connect(mapStateToProps)(NavigationBar);
