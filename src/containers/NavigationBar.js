import React, { Component } from 'react';
import createHistory from 'history/createBrowserHistory';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import NavBarNoUser from '../components/NavBar/NavBarNoUser';
import NavBarLoggedIn from '../components/NavBar/NavBarLoggedIn';

const mapStateToProps = state => {
  return { state };
};

const history = createHistory();

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }

  /*componentWillMount() {
    if (!this.props.state.books.size) {
      let getBooksAsync = getBooks();
      getBooksAsync.then(books => {
        this.props.dispatch(hydrateBooks(books));
      });
    }
  }*/

  login(email, password) {
    console.log('loggin in boi');
  }

  render() {
    const { user } = this.props.state;
    console.log(user.id)
    if (user.id === -1) {
      return (
        <ConnectedRouter history={history}>
          <NavBarNoUser login={this.login} />
        </ConnectedRouter>
      );
    }
    return (
      <ConnectedRouter history={history}>
        <NavBarLoggedIn />
      </ConnectedRouter>
    )
  }
}

export default connect(mapStateToProps)(NavigationBar);
