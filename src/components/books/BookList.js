import React, { Component } from 'react';
import Book from './Book';
import { getBooks, hydrateBooks, deleteBook } from '../../actions/index';

class BookList extends Component {

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
    const bookList = this.props.state.books;
    return (
      <div>
        {!!bookList.size && (
          <ul>
            {bookList.map(book => {
              return (
                <Book
                  key={book.id}
                  dispatch={this.props.dispatch}
                  book={book}
                  delete={this.delete}
                />
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}

export default BookList;
