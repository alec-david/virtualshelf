import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';

import BookCard from '../../containers/books/BookCard';
import NewBookCard from './NewBookCard';

const BookList = (props) => {
  const bookList = props.books;

  return (
    <div>
      {!!bookList.size && (
        <Card.Group itemsPerRow={props.colNum}>
          <NewBookCard addBook={props.addBook} />
          {bookList.map(book => {
            return (
              <BookCard
                key={book.id}
                book={book}
                delete={props.delete}
                edit={props.edit}
              />
            );
          })}
        </Card.Group>
      )}
    </div>
  );
}

export default BookList;
