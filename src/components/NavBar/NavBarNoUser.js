import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { Nav, Navbar, NavItem, FormGroup, FormControl, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import MainPage from '../MainPage';
import BookPage from '../books/BookPage';
import MoviePage from '../movies/MoviePage';
import TelevisionPage from '../television/TelevisionPage';

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
            <Navbar.Form pullRight>
              <FormGroup>
                <FormControl
                  inputRef={input => { this.emailInput = input }}
                  type="email"
                  placeholder="Email" />
                <FormControl
                  inputRef={input => { this.pwInput = input }}
                  type="password"
                  placeholder="Password" />
              </FormGroup>{' '}
              <Button
                type="submit"
                onClick={() => this.props.login(this.emailInput.value, this.pwInput.value)}>
                Login/Sign up
              </Button>
              {' '}
              <span>G</span>
              {' '}
              <span>F</span>
            </Navbar.Form>
          </Navbar.Collapse>
        </Navbar>
        <div className="routes">
          <Route exact path="/" component={MainPage} />
          <Route exact path="/books" component={BookPage} />
          <Route exact path="/movies" component={MoviePage} />
          <Route exact path="/television" component={TelevisionPage} />
        </div>
      </div>
    );
  }
}

export default App;
