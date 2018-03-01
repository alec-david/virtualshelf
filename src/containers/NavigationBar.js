import React, { Component } from 'react';

import NavBarNoUser from '../components/NavBar/NavBarNoUser';
import NavBarLoggedIn from '../components/NavBar/NavBarLoggedIn';


class NavigationBar extends Component {

  render() {
    const { user } = this.props;
    if (!user.token) {
      return (
        <NavBarNoUser />
      )
    } else {
      return (
        <NavBarLoggedIn />
      )
    }
  }
}

export default NavigationBar;
