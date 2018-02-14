import React, { Component } from 'react';
import Book from './Book';

class BookList extends Component {

  render() {
    const bookList = this.props.books;
    return (
      <div>
        {!!bookList.size && (
          <ul>
            {bookList.map(book => {
              return (
                <Book
                  key={book.id}
                  book={book}
                  delete={this.props.delete}
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
