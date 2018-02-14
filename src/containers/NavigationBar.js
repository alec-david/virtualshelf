import React, { Component } from 'react';
import createHistory from 'history/createBrowserHistory';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import NavBarNoUser from '../components/NavBar/NavBarNoUser';
import NavBarLoggedIn from '../components/NavBar/NavBarLoggedIn';
import { login } from '../actions/index';

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
    console.log('hello');
  }

  handleAuthentication = (nextState, replace) => {
    //if (/access_token|id_token|error/.test(nextState.location.hash)) {
    //auth.handleAuthentication(this.props.dispatch);
    //history.replace('/');
    //}
    console.log('authing');
  }

  //Do something here to check if user has already logged in
  //Look into cookies/localStorage/whatever
  /*componentWillMount() {
    if (localStorage.expires_at) {
      let userInfo = {
        access_token: localStorage.access_token,
        id_token: localStorage.id_token,
        expires_at: localStorage.expires_at
      }
      const checkLocalStorageUser = login(userInfo);
      this.props.dispatch(checkLocalStorageUser);
    }
  }*/

  render() {
    const { user } = this.props.state;
    console.log(user);
    //if (!auth.checkValidUser(user.expires_at)) {
    return (
      <ConnectedRouter history={history}>
        <NavBarNoUser login={this.login} authenticateUser={this.handleAuthentication} />
      </ConnectedRouter>
    );
    //}
    // return (
    //   <ConnectedRouter history={history}>
    //     <NavBarLoggedIn auth={auth} />
    //   </ConnectedRouter>
    // )
  }
}

export default connect(mapStateToProps)(NavigationBar);
