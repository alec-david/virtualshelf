import React, { Component } from 'react';
import BookCard from '../../containers/books/BookCard';
import { Card } from 'semantic-ui-react';

class BookList extends Component {

  render() {
    const bookList = this.props.books;
    const colNum = this.props.colNum;
    return (
      <div>
        {!!bookList.size && (
          <Card.Group itemsPerRow={colNum}>
            {bookList.map(book => {
              return (
                <BookCard
                  key={book.id}
                  book={book}
                  delete={this.props.delete}
                  edit={this.props.edit}
                />
              );
            })}
          </Card.Group>
        )}
      </div>
    );
  }
}

export default BookList;
