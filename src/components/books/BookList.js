import React from 'react';
import { Card } from 'semantic-ui-react';

import BookCard from '../../containers/books/BookCard';
import NewBookCard from '../../containers/books/NewBookCard';

const BookList = (props) => {
  //const bookList = props.books;
  const { user, books } = props;
  let addNewBook;
  if (user.email) {
    addNewBook = <NewBookCard />
  }

  return (
    <div>
      {!!books.size && (
        <Card.Group itemsPerRow={props.colNum}>
          {addNewBook}

          {books.map(book => {
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
