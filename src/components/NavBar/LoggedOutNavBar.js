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
  render() {
    const { nav, setActiveItem } = this.props;
    const { activeItem } = nav;

    return (
      <Responsive {...Responsive.onlyComputer}>
        <Menu size="large" className="menuPadding">
          <Container fluid>
            <Menu.Item
              as={Link}
              to="/"
              name="home"
              active={activeItem === 'home'}
              onClick={setActiveItem}
            >
              Home
            </Menu.Item>
            <Menu.Item
              name="books"
              active={activeItem === 'books'}
              onClick={setActiveItem}
              as={Link}
              to="/books"
            >
              Books
            </Menu.Item>
            <Menu.Item
              name="movies"
              active={activeItem === 'movies'}
              onClick={setActiveItem}
              as={Link}
              to="/movies"
            >
              Movies
            </Menu.Item>
            <Menu.Item
              name="television"
              active={activeItem === 'television'}
              onClick={setActiveItem}
              as={Link}
              to="/television"
            >
              Television
            </Menu.Item>
            <Menu.Menu position="right">
              <Menu.Item
                name="login"
                active={activeItem === 'login'}
                onClick={setActiveItem}
                as={Link}
                to="/login"
              >
                Login
              </Menu.Item>
              <Menu.Item
                name="register"
                active={activeItem === 'register'}
                onClick={setActiveItem}
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
  render() {
    const { nav, setActiveItem } = this.props;
    const { activeItem } = nav;

    return (
      <Responsive {...Responsive.onlyTablet}>
        <Menu size="large" className="menuPadding">
          <Container fluid>
            <Menu.Item
              as={Link}
              to="/"
              name="home"
              active={activeItem === 'home'}
              onClick={setActiveItem}
            >
              Home
            </Menu.Item>
            <Menu.Item
              name="books"
              active={activeItem === 'books'}
              onClick={setActiveItem}
              as={Link}
              to="/books"
            >
              Books
            </Menu.Item>
            <Menu.Item
              name="movies"
              active={activeItem === 'movies'}
              onClick={setActiveItem}
              as={Link}
              to="/movies"
            >
              Movies
            </Menu.Item>
            <Menu.Item
              name="television"
              active={activeItem === 'television'}
              onClick={setActiveItem}
              as={Link}
              to="/television"
            >
              Television
            </Menu.Item>
            <Menu.Menu position="right">
              <Menu.Item
                name="login"
                active={activeItem === 'login'}
                onClick={setActiveItem}
                as={Link}
                to="/login"
              >
                Login
              </Menu.Item>
              <Menu.Item
                name="register"
                active={activeItem === 'register'}
                onClick={setActiveItem}
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
  render() {
    const { nav, setActiveItem, handlePusher, handleToggle } = this.props;
    const { activeItem, visible } = nav;

    return (
      <Responsive {...Responsive.onlyMobile}>
        <Sidebar.Pushable>
          <Sidebar as={Menu} animation="overlay" icon="labeled" inverted vertical visible={visible}>
            <Menu.Item
              as={Link}
              to="/"
              name="home"
              active={activeItem === 'home'}
              onClick={setActiveItem}
            >
              Home
            </Menu.Item>
            <Menu.Item
              name="books"
              active={activeItem === 'books'}
              onClick={setActiveItem}
              as={Link}
              to="/books"
            >
              Books
            </Menu.Item>
            <Menu.Item
              name="movies"
              active={activeItem === 'movies'}
              onClick={setActiveItem}
              as={Link}
              to="/movies"
            >
              Movies
            </Menu.Item>
            <Menu.Item
              name="television"
              active={activeItem === 'television'}
              onClick={setActiveItem}
              as={Link}
              to="/television"
            >
              Television
            </Menu.Item>
            <Menu.Item
              name="login"
              active={activeItem === 'login'}
              onClick={setActiveItem}
              as={Link}
              to="/login"
            >
              Login
            </Menu.Item>
            <Menu.Item
              name="register"
              active={activeItem === 'register'}
              onClick={setActiveItem}
              as={Link}
              to="/register"
            >
              Register
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher dimmed={visible} onClick={handlePusher} style={{ minHeight: '100vh' }}>
            <Menu fixed="top" inverted>
              <Menu.Item onClick={handleToggle}>
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

const ResponsiveContainer = props => {
  return (
    <div>
      <DesktopContainer nav={props.nav} setActiveItem={props.setActiveItem} />
      <TabletContainer nav={props.nav} setActiveItem={props.setActiveItem} />
      <MobileContainer
        nav={props.nav}
        setActiveItem={props.setActiveItem}
        handlePusher={props.handlePusher}
        handleToggle={props.handleToggle}
      />
    </div>
  );
};

const LoggedOutNavBar = props => (
  <ResponsiveContainer
    nav={props.nav}
    setActiveItem={props.setActiveItem}
    handlePusher={props.handlePusher}
    handleToggle={props.handleToggle}
  />
);
export default LoggedOutNavBar;
