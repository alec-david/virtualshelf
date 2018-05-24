import React, { Component } from 'react';
import { Container, Icon, Menu, Responsive, Sidebar } from 'semantic-ui-react';
import { Route, Link } from 'react-router-dom';

import MainPage from '../main/MainPage';
import BookPage from '../books/BookPage';
import MoviePage from '../movies/MoviePage';
import TelevisionPage from '../television/TelevisionPage';
import LoginPage from '../login/LoginPage';
import RegisterPage from '../register/RegisterPage';
import VerifyPage from '../VerifyPage';
import ResetPasswordPage from '../resetPassword/ResetPasswordPage';

const loggedOutRoutes = (
  <div className="routes">
    <Route exact path="/" component={MainPage} />
    <Route exact path="/books" render={() => <BookPage loggedIn={false} />} />
    <Route exact path="/movies" render={() => <MoviePage loggedIn={false} />} />
    <Route exact path="/television" render={() => <TelevisionPage loggedIn={false} />} />
    <Route exact path="/login" component={LoginPage} />
    <Route exact path="/register" component={RegisterPage} />
    <Route exact path="/verify" component={VerifyPage} />
    <Route exact path="/reset_password" component={ResetPasswordPage} />
  </div>
);

class DesktopContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Responsive {...Responsive.onlyComputer}>
        <Menu size="large" style={{ paddingLeft: '50px', paddingRight: '50px' }}>
          <Container fluid>
            <Menu.Item
              as={Link}
              to="/"
              name="home"
              active={activeItem === 'home'}
              onClick={this.handleItemClick}
            >
              Home
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
                name="login"
                active={activeItem === 'login'}
                onClick={this.handleItemClick}
                as={Link}
                to="/login"
              >
                Login
              </Menu.Item>
              <Menu.Item
                name="register"
                active={activeItem === 'register'}
                onClick={this.handleItemClick}
                as={Link}
                to="/register"
              >
                Register
              </Menu.Item>
            </Menu.Menu>
          </Container>
        </Menu>
        {loggedOutRoutes}
      </Responsive>
    );
  }
}

class TabletContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Responsive {...Responsive.onlyTablet}>
        <Menu size="large">
          <Container fluid>
            <Menu.Item
              as={Link}
              to="/"
              name="home"
              active={activeItem === 'home'}
              onClick={this.handleItemClick}
            >
              Home
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
                name="login"
                active={activeItem === 'login'}
                onClick={this.handleItemClick}
                as={Link}
                to="/login"
              >
                Login
              </Menu.Item>
              <Menu.Item
                name="register"
                active={activeItem === 'register'}
                onClick={this.handleItemClick}
                as={Link}
                to="/register"
              >
                Register
              </Menu.Item>
            </Menu.Menu>
          </Container>
        </Menu>
        {loggedOutRoutes}
      </Responsive>
    );
  }
}

class MobileContainer extends Component {
  state = {
    visible: false
  };

  handlePusher = () => {
    const { visible } = this.state;

    if (visible) this.setState({ visible: false });
  };

  handleToggle = () => this.setState({ visible: !this.state.visible });

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem, visible } = this.state;

    return (
      <Responsive {...Responsive.onlyMobile}>
        <Sidebar.Pushable>
          <Sidebar as={Menu} animation="overlay" icon="labeled" inverted vertical visible={visible}>
            <Menu.Item
              as={Link}
              to="/"
              name="home"
              active={activeItem === 'home'}
              onClick={this.handleItemClick}
            >
              Home
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
            <Menu.Item
              name="login"
              active={activeItem === 'login'}
              onClick={this.handleItemClick}
              as={Link}
              to="/login"
            >
              Login
            </Menu.Item>
            <Menu.Item
              name="register"
              active={activeItem === 'register'}
              onClick={this.handleItemClick}
              as={Link}
              to="/register"
            >
              Register
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher
            dimmed={visible}
            onClick={this.handlePusher}
            style={{ minHeight: '100vh' }}
          >
            <Menu fixed="top" inverted>
              <Menu.Item onClick={this.handleToggle}>
                <Icon name="sidebar" />
              </Menu.Item>
            </Menu>
            {loggedOutRoutes}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Responsive>
    );
  }
}

const ResponsiveContainer = () => (
  <div>
    <DesktopContainer />
    <TabletContainer />
    <MobileContainer />
  </div>
);

const HomepageLayout = () => <ResponsiveContainer />;
export default HomepageLayout;
