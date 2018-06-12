import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import bookImg from '../../imgs/book.png';

import BookCardContent from './BookCardContent';

const imgStyle = {
  height: 300 + 'px'
};

const Book = props => {
  const { book, user, handleSettings } = props;

  return (
    <Card raised>
      <Image
        src={book.image_url ? book.image_url : bookImg}
        style={imgStyle}
        centered
        title={book.image_url}
      />
      <BookCardContent book={book} handleSettings={handleSettings} email={user.email} />
    </Card>
  );
};

export default Book;
