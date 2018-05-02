import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import bookImg from '../../imgs/book.svg';

import BookCardContent from './BookCardContent';

const Book = (props) => {
  const { book, user, handleSettings } = props;

  return (
    <Card>
      <Image
        src={book.image_url ? book.image_url : bookImg}
      />
      <BookCardContent
        book={book}
        handleSettings={handleSettings}
        email={user.email}
      />
    </Card>
  )
}

export default Book;