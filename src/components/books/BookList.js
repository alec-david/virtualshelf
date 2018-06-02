import React from 'react';
import { Card } from 'semantic-ui-react';

import BookCard from '../../containers/books/BookCard';
import NewBookCard from '../../containers/books/NewBookCard';

const BookList = props => {
  const { user, books } = props;

  const addNewBook = user.email ? <NewBookCard /> : '';
  const srcText = books.bookCount ? 'All images sourced from https://www.wikipedia.org/' : '';

  return (
    <div>
      <Card.Group centered>
        {addNewBook}

        {books.list.slice(0, books.loadedBooks).map(book => {
          return <BookCard key={book.id} book={book} />;
        })}
      </Card.Group>
      <br />
      <span className="srcText">{srcText}</span>
    </div>
  );
};

export default BookList;
