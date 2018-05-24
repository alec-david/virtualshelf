import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBooks, getUserBooks, hydrateBooks } from '../../actions/book';
import { setHydratedBooksFlag } from '../../actions/user';

import BookList from '../../components/books/BookList';

class VisibleBookList extends Component {
  state = {
    width: window.innerWidth
  };

  componentWillMount() {
    const { books, user } = this.props.state;
    //If books haven't been hydrated yet
    if (!user.loggingIn && !user.hydratedBooks) {
      this.checkUserLoggedIn(books, user);
    }

    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  checkUserLoggedIn(books, user) {
    if (!user.email) {
      this.fetchMostRecentBooks(books);
    } else {
      this.fetchUserBooks(books, user);
    }
  }

  fetchMostRecentBooks(books) {
    getBooks()
      .then(books => {
        this.props.dispatch(hydrateBooks(books.body));
      })
      .then(() => {
        this.props.dispatch(setHydratedBooksFlag());
      });
  }

  fetchUserBooks(books, user) {
    getUserBooks(user.token)
      .then(books => {
        if (!JSON.parse(books.body).length) {
          //Show this message on screen at some point
          console.log('No books entered yet!');
          return;
        }
        this.props.dispatch(hydrateBooks(books.body));
      })
      .then(() => {
        this.props.dispatch(setHydratedBooksFlag());
      });
  }

  render() {
    const { user, books } = this.props.state;
    if (user.hydratedBooks) {
      return <BookList books={books} user={user} />;
    }
    return <div />;
  }
}

const mapStateToProps = state => {
  return { state };
};

export default connect(mapStateToProps)(VisibleBookList);
