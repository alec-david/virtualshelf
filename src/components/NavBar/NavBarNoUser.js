import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { Nav, Navbar, NavItem, FormGroup, FormControl, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import MainPage from '../MainPage';
import BookPage from '../books/BookPage';
import MoviePage from '../movies/MoviePage';
import TelevisionPage from '../television/TelevisionPage';
import LoginPage from '../LoginPage';
import RegisterPage from '../RegisterPage';

class App extends Component {
  render() {
    return (
      <div>
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
              <LinkContainer to="/login">
                <NavItem>Sign In</NavItem>
              </LinkContainer>
              <LinkContainer to="/register">
                <NavItem>Sign Up</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="routes">
          <Route exact path="/" component={MainPage} />
          <Route exact path="/books" component={BookPage} />
          <Route exact path="/movies" component={MoviePage} />
          <Route exact path="/television" component={TelevisionPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
        </div>
      </div>
    );
  }
}

export default App;
