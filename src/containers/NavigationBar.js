import React, { Component } from 'react';

import LoggedInNavBar from '../components/NavBar/LoggedInNavBar';
import LoggedOutNavBar from '../components/NavBar/LoggedOutNavBar';

class NavigationBar extends Component {
  render() {
    const { user } = this.props;

    if (user.token) {
      return <LoggedInNavBar />;
    }
    return <LoggedOutNavBar />;
  }
}

export default NavigationBar;
