import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Main from './Main';
import Books from './Books';
import Movies from './Movies';
import Television from './Television';

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
              <NavItem eventKey={1} href="#">
                Login
              </NavItem>
              <NavItem eventKey={2} href="#">
                Sign Up
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="routes">
          <Route exact path="/" component={Main} />
          <Route exact path="/books" component={Books} />
          <Route exact path="/movies" component={Movies} />
          <Route exact path="/television" component={Television} />
        </div>
      </div>
    );
  }
}

export default App;

/*
<div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Remembr</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem>
                <Link to="/books">Books</Link>
              </NavItem>
              <NavItem>
                <Link to="/movies">Movies</Link>
              </NavItem>
              <NavItem>
                <Link to="/television">Television</Link>
              </NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1} href="#">
                Login
              </NavItem>
              <NavItem eventKey={2} href="#">
                Sign Up
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="routes">
          <Route exact path="/" component={Main} />
          <Route exact path="/books" component={Books} />
          <Route exact path="/movies" component={Movies} />
          <Route exact path="/television" component={Television} />
        </div>
      </div>
*/
