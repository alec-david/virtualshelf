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

  getNumberOfColumns = () => {
    const { width } = this.state;

    if (width > 1600) {
      return 7;
    } else if (width > 1400 && width <= 1600) {
      return 6;
    } else if (width > 1200 && width <= 1400) {
      return 5;
    } else if (width > 1000 && width <= 1200) {
      return 4;
    } else if (width > 800 && width <= 1000) {
      return 3;
    } else if (width > 600 && width <= 800) {
      return 2;
    } else {
      //Mobile width
      return 1;
    }
  };

  render() {
    return (
      <BookList
        books={this.props.state.books.list}
        colNum={this.getNumberOfColumns()}
        user={this.props.state.user}
      />
    );
  }
}

const mapStateToProps = state => {
  return { state };
};

export default connect(mapStateToProps)(VisibleBookList);
