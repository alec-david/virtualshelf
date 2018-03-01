import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getBooks,
  getUserBooks,
  hydrateBooks
} from '../../actions/index';

import BookList from '../../components/books/BookList';

const mapStateToProps = state => {
  return { state };
};

class VisibleBookList extends Component {

  componentWillMount() {
    const { books, user } = this.props.state;
    //If books haven't been hydrated yet
    if (!books.size && !user.loggingIn) {
      this.checkUserLoggedIn(books, user);
    }
  }

  checkUserLoggedIn(books, user) {
    if (!user.email) {
      this.fetchMostRecentBooks(books);
    } else {
      this.fetchUserBooks(books, user);
    }
  }

  fetchMostRecentBooks(books) {
    getBooks().then(books => {
      this.props.dispatch(hydrateBooks(books.body));
    });
  }

  fetchUserBooks(books, user) {
    getUserBooks(user.token).then(books => {
      if (!JSON.parse(books.body).length) {
        //Show this message on screen at some point
        console.log('No books entered yet!');
        return;
      }
      this.props.dispatch(hydrateBooks(books.body));
    });
  }

  render() {
    return (
      <BookList
        books={this.props.state.books}
      />
    );
  }
}

export default connect(mapStateToProps)(VisibleBookList);
