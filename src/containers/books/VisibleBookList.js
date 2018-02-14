import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBooks, hydrateBooks, deleteBook } from '../../actions/index';

import BookList from '../../components/books/BookList';

const mapStateToProps = state => {
  return { state };
};

class VisibleBookList extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
  }

  componentWillMount() {
    if (!this.props.state.books.size) {
      let getBooksAsync = getBooks();
      getBooksAsync.then(books => {
        this.props.dispatch(hydrateBooks(books));
      });
    }
  }

  delete(id) {
    this.props.dispatch(deleteBook(id));
  }

  render() {
    return (
      <BookList delete={this.delete} books={this.props.state.books} />
    );
  }
}

export default connect(mapStateToProps)(VisibleBookList);
