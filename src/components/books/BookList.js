import React from 'react';
import { Card } from 'semantic-ui-react';

import BookCard from '../../containers/books/BookCard';
import NewBookCard from '../../containers/books/NewBookCard';

const BookList = (props) => {
  const { user, books } = props;
  let addNewBook;
  if (user.email) {
    addNewBook = <NewBookCard />
  }

  return (
    <div>
      <Card.Group itemsPerRow={props.colNum}>
        {addNewBook}

        {books.map(book => {
          return (
            <BookCard
              key={book.id}
              book={book}
            />
          );
        })}
      </Card.Group>
    </div>
  );
}

export default BookList;
