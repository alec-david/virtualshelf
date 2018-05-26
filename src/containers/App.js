import React, { Component } from 'react';
import createHistory from 'history/createBrowserHistory';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import NavigationBar from './NavigationBar';
import { loginToken, logout } from '../actions/user';

const history = createHistory();

class App extends Component {
  //Check localStorage to see if user has already created an
  //account. If so, log that user in.
  componentWillMount() {
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
  }

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
