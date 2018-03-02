import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getBooks,
  getUserBooks,
  hydrateBooks
} from '../../actions/index';

import BookList from '../../components/books/BookList';

class VisibleBookList extends Component {

  constructor() {
    super();
    this.state = {
      width: window.innerWidth
    }
  }

  componentWillMount() {
    const { books, user } = this.props.state;
    //If books haven't been hydrated yet
    if (!books.size && !user.loggingIn) {
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
    const { width } = this.state;
    let colNum;
    if (width > 1600) {
      colNum = 8;
    } else if (width > 1400 && width <= 1600) {
      colNum = 7;
    } else if (width > 1200 && width <= 1400) {
      colNum = 6;
    } else if (width > 1000 && width <= 1200) {
      colNum = 5;
    } else if (width > 800 && width <= 1000) {
      colNum = 4;
    } else if (width > 600 && width <= 800) {
      colNum = 3;
    } else { //Mobile width
      colNum = 1;
    }
    return (
      <BookList
        books={this.props.state.books}
        colNum={colNum}
      />
    );
  }
}

const mapStateToProps = state => {
  return { state };
};

export default connect(mapStateToProps)(VisibleBookList);
