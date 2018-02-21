import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react'

import MainPage from '../MainPage';
import BookPage from '../books/BookPage';
import MoviePage from '../movies/MoviePage';
import TelevisionPage from '../television/TelevisionPage';
import ProfilePage from '../profile/ProfilePage';

class NavBarLoggedIn extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state;
    return (
      <div>
        <Menu stackable>
          <Menu.Item header
            name='remembr'
            onClick={this.handleItemClick}
            as={Link}
            to='/'
          >
            Remembr
          </Menu.Item>
          <Menu.Item
            name='books'
            active={activeItem === 'books'}
            onClick={this.handleItemClick}
            as={Link}
            to='/books'
          >
            Books
          </Menu.Item>
          <Menu.Item
            name='movies'
            active={activeItem === 'movies'}
            onClick={this.handleItemClick}
            as={Link}
            to='/movies'
          >
            Movies
          </Menu.Item>
          <Menu.Item
            name='television'
            active={activeItem === 'television'}
            onClick={this.handleItemClick}
            as={Link}
            to='/television'
          >
            Television
          </Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item
              name='profile'
              active={activeItem === 'profile'}
              onClick={this.handleItemClick}
              as={Link}
              to='/profile'
            >
              Profile
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <div className="routes">
          <Route exact path="/" component={MainPage} />
          <Route exact path="/books" component={BookPage} />
          <Route exact path="/movies" component={MoviePage} />
          <Route exact path="/television" component={TelevisionPage} />
          <Route exact path="/profile" component={ProfilePage} />
        </div>
      </div>
    );
  }
}

export default NavBarLoggedIn;


/*
<Navbar fluid collapseOnSelect>
  <Navbar.Header>
    <Navbar.Brand>
      <Link to="/">Remembr</Link>
    </Navbar.Brand>
    <Navbar.Toggle />
  </Navbar.Header>
  <Navbar.Collapse>
    <Nav>
      <LinkContainer to="/books">
        <NavItem>Books</NavItem>
      </LinkContainer>
      <LinkContainer to="/movies">
        <NavItem>Movies</NavItem>
      </LinkContainer>
      <LinkContainer to="/television">
        <NavItem>Television</NavItem>
      </LinkContainer>
    </Nav>
    <Nav pullRight>
      <LinkContainer to="/profile">
        <NavItem>Profile</NavItem>
      </LinkContainer>
    </Nav>
  </Navbar.Collapse>
</Navbar>
*/