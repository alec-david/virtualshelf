import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import MainPage from '../main/MainPage';
import BookPage from '../books/BookPage';
import MoviePage from '../movies/MoviePage';
import TelevisionPage from '../television/TelevisionPage';
import ProfilePage from '../profile/ProfilePage';
import VerifyPage from '../VerifyPage';

class NavBarLoggedIn extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    return (
      <div>
        <Menu stackable>
          <Menu.Item header name="remembr" onClick={this.handleItemClick} as={Link} to="/">
            Remembr
          </Menu.Item>
          <Menu.Item
            name="books"
            active={activeItem === 'books'}
            onClick={this.handleItemClick}
            as={Link}
            to="/books"
          >
            Books
          </Menu.Item>
          <Menu.Item
            name="movies"
            active={activeItem === 'movies'}
            onClick={this.handleItemClick}
            as={Link}
            to="/movies"
          >
            Movies
          </Menu.Item>
          <Menu.Item
            name="television"
            active={activeItem === 'television'}
            onClick={this.handleItemClick}
            as={Link}
            to="/television"
          >
            Television
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item
              name="profile"
              active={activeItem === 'profile'}
              onClick={this.handleItemClick}
              as={Link}
              to="/profile"
            >
              Profile
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <div className="routes">
          <Route exact path="/" component={MainPage} />
          <Route exact path="/books" render={() => <BookPage loggedIn={true} />} />
          <Route exact path="/movies" render={() => <MoviePage loggedIn={true} />} />
          <Route exact path="/television" render={() => <TelevisionPage loggedIn={true} />} />
          <Route exact path="/profile" component={ProfilePage} />
          <Route exact path="/verify" component={VerifyPage} />
        </div>
      </div>
    );
  }
}

export default NavBarLoggedIn;
