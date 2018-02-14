import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react'

import MainPage from '../MainPage';
import BookPage from '../books/BookPage';
import MoviePage from '../movies/MoviePage';
import TelevisionPage from '../television/TelevisionPage';
import LoginPage from '../LoginPage';
import RegisterPage from '../RegisterPage';

class NavBarNoUser extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

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
              name='login'
              active={activeItem === 'login'}
              onClick={this.handleItemClick}
              as={Link}
              to='login'
            >
              Login
            </Menu.Item>
            <Menu.Item
              name='register'
              active={activeItem === 'register'}
              onClick={this.handleItemClick}
              as={Link}
              to='register'
            >
              Register
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <div className="routes">
          <Route exact path="/" component={MainPage} />
          <Route exact path="/books" component={BookPage} />
          <Route exact path="/movies" component={MoviePage} />
          <Route exact path="/television" component={TelevisionPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/login" component={LoginPage} />
        </div>
      </div>
    )
  }
}

export default NavBarNoUser;

// class NavBarNoUser extends Component {
//   render() {
//     return (
//       <div>
//         <div className="routes">
//           <Route exact path="/" component={MainPage} />
//           <Route exact path="/books" component={BookPage} />
//           <Route exact path="/movies" component={MoviePage} />
//           <Route exact path="/television" component={TelevisionPage} />
//         </div>
//       </div>
//     );
//   }
// }

// export default NavBarNoUser;

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
    <Navbar.Form pullRight>
      <Button onClick={this.props.login}>Login</Button>
    </Navbar.Form>
  </Navbar.Collapse>
</Navbar>
*/