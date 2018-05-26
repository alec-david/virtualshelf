import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateActiveItem, toggleVisible } from '../actions/nav';

import LoggedInNavBar from '../components/NavBar/LoggedInNavBar';
import LoggedOutNavBar from '../components/NavBar/LoggedOutNavBar';

class NavigationBar extends Component {
  setActiveItem = (e, { name }) => {
    this.props.dispatch(updateActiveItem(name));
  };

  handlePusher = () => {
    const { visible } = this.props.state.nav;

    if (visible) {
      this.props.dispatch(toggleVisible());
    }
  };

  handleToggle = () => this.props.dispatch(toggleVisible());

  render() {
    const { user, nav } = this.props.state;

    if (user.token) {
      return (
        <LoggedInNavBar
          nav={nav}
          setActiveItem={this.setActiveItem}
          handlePusher={this.handlePusher}
          handleToggle={this.handleToggle}
        />
      );
    }
    return (
      <LoggedOutNavBar
        nav={nav}
        setActiveItem={this.setActiveItem}
        handlePusher={this.handlePusher}
        handleToggle={this.handleToggle}
      />
    );
  }
}

const mapStateToProps = state => {
  return { state };
};

export default connect(mapStateToProps)(NavigationBar);
