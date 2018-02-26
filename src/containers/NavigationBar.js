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

  //Check localStorage to see if user has already created an
  //account. If so, log that user in.
  componentWillMount() {
    if (localStorage.token) {
      loginToken(localStorage.token).then(result => {
        this.props.dispatch(result);
      }).catch(err => {
        console.log(err);
      })
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
