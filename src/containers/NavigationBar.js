import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateActiveItem, toggleVisible } from '../actions/nav';

import LoggedInNavBar from '../components/NavBar/LoggedInNavBar';
import LoggedOutNavBar from '../components/NavBar/LoggedOutNavBar';

class NavigationBar extends Component {
  setActiveItem = (e, { name }) => {
    this.props.dispatch(updateActiveItem(name));
    this.props.dispatch(toggleVisible());
  };

  handlePusher = () => {
    const { visible } = this.props.state.nav;

    if (visible) {
      this.props.dispatch(toggleVisible());
    }
  };

  handleToggle = () => {
    this.props.dispatch(toggleVisible());
  };

  render() {
    const { user, nav, books, movies, television } = this.props.state;

    if (user.token) {
      return (
        <LoggedInNavBar
          nav={nav}
          setActiveItem={this.setActiveItem}
          handlePusher={this.handlePusher}
          handleToggle={this.handleToggle}
          bookCount={books.bookCount}
          movieCount={movies.movieCount}
          televisionCount={television.televisionCount}
        />
      );
    }
    return (
      <LoggedOutNavBar
        nav={nav}
        setActiveItem={this.setActiveItem}
        handlePusher={this.handlePusher}
        handleToggle={this.handleToggle}
        bookCount={books.bookCount}
        movieCount={movies.movieCount}
        televisionCount={television.televisionCount}
      />
    );
  }
}

const mapStateToProps = state => {
  return { state };
};

export default connect(mapStateToProps)(NavigationBar);
