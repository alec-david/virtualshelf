import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import bookImg from '../../imgs/book.svg';

import BookCardContent from './BookCardContent';

const Book = props => {
  const { book, user, handleSettings } = props;

  const bleh = {
    height: 300 + 'px'
  };
  return (
    <Card raised={true}>
      <Image
        src={book.image_url ? book.image_url : bookImg}
        style={bleh}
        centered={true}
        title={book.image_url}
      />
      <BookCardContent book={book} handleSettings={handleSettings} email={user.email} />
    </Card>
  );
};

export default Book;
