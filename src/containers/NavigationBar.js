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
  }

  login(email, password) {
    console.log('e: ' + email + '. pw: ' + password);
    this.props.dispatch(login(email, password));
    //this.forceUpdate();
  }

  render() {
    const { user } = this.props.state;
    console.log(user);
    if (!user.isLoggedIn) {
      return (
        <ConnectedRouter history={history}>
          <NavBarNoUser login={this.login} />
        </ConnectedRouter>
      );
    }
    return (
      <ConnectedRouter history={history}>
        <NavBarLoggedIn />
      </ConnectedRouter>
    )
  }
}

export default connect(mapStateToProps)(NavigationBar);
