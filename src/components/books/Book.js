import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';
import bookImg from '../../imgs/book.svg';

import BookCardContent from './BookCardContent';

class Book extends Component {

  render() {
    const { book, user, handleSettings } = this.props;

    return (
      <Card>
        <Image src={bookImg} />
        <BookCardContent
          book={book}
          handleSettings={handleSettings}
          email={user.email}
        />
      </Card>
    );
  }
}

export default Book;
