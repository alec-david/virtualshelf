import React, { Component } from 'react';

import NavBarNoUser from '../components/NavBar/NavBarNoUser';
import NavBarLoggedIn from '../components/NavBar/NavBarLoggedIn';

import HomePageLayout from '../components/NavBar/HomePageLayout';

class NavigationBar extends Component {
  render() {
    return <HomePageLayout />;
    // const { user } = this.props;
    // if (!user.token) {
    //   return <NavBarNoUser />;
    // } else {
    //   return <NavBarLoggedIn />;
    // }
  }
}

export default NavigationBar;
