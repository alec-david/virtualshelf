import React from 'react';
import { Card } from 'semantic-ui-react';

import BookCard from '../../containers/books/BookCard';
import NewBookCard from '../../containers/books/NewBookCard';
import SrcText from '../util/SrcText';

const BookList = props => {
  const { user, books } = props;

  const addNewBook = user.email ? <NewBookCard /> : '';

  return (
    <div>
      <Card.Group centered>
        {addNewBook}

        {books.list.slice(0, books.loadedBooks).map(book => {
          return <BookCard key={book.id} book={book} />;
        })}
      </Card.Group>
      <SrcText itemCount={books.bookCount} />
    </div>
  );
};

export default BookList;
