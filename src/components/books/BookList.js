import React, { Component } from 'react';
import Book from './Book';

class BookList extends Component {
  render() {
    const bookList = this.props.state.books;
    // console.log(this.props.state.books);
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
