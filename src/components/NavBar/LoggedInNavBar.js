import React, { Component } from 'react';
import { Container, Icon, Menu, Responsive, Sidebar } from 'semantic-ui-react';
import { Route, Link } from 'react-router-dom';

import MainPage from '../main/MainPage';
import BookPage from '../books/BookPage';
import MoviePage from '../movies/MoviePage';
import TelevisionPage from '../television/TelevisionPage';
import ProfilePage from '../profile/ProfilePage';
import VerifyPage from '../VerifyPage';
import ResetPasswordPage from '../resetPassword/ResetPasswordPage';

const loggedInRoutes = (
  <div className="routes">
    <Route exact path="/" component={MainPage} />
    <Route exact path="/books" render={() => <BookPage loggedIn={true} />} />
    <Route exact path="/movies" render={() => <MoviePage loggedIn={true} />} />
    <Route exact path="/television" render={() => <TelevisionPage loggedIn={true} />} />
    <Route exact path="/profile" component={ProfilePage} />
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
                name="profile"
                active={activeItem === 'profile'}
                onClick={this.handleItemClick}
                as={Link}
                to="/profile"
              >
                Profile
              </Menu.Item>
            </Menu.Menu>
          </Container>
        </Menu>
        {loggedInRoutes}
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
                name="profile"
                active={activeItem === 'profile'}
                onClick={this.handleItemClick}
                as={Link}
                to="/profile"
              >
                Profile
              </Menu.Item>
            </Menu.Menu>
          </Container>
        </Menu>
        {loggedInRoutes}
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
              name="profile"
              active={activeItem === 'profile'}
              onClick={this.handleItemClick}
              as={Link}
              to="/profile"
            >
              Profile
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
            {loggedInRoutes}
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
