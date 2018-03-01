import React, { Component } from 'react';
import { Button, Card, Image, Rating } from 'semantic-ui-react';
import bookImg from '../../imgs/book.svg';

import BookCardContent from './BookCardContent';
import BookCardButtons from './BookCardButtons';

class Book extends Component {
  render() {
    const { book, edit, deleteBook, user } = this.props;
    
    if (user.email) {
      return (
        <Card>
          <Image src={bookImg} />
          <BookCardContent book={book} />
          <BookCardButtons edit={edit} deleteBook={deleteBook}/>
        </Card>
      );
    } else {
      return (
        <Card>
          <Image src={bookImg} />
          <BookCardContent book={book} />
        </Card>
      );
    }
  }
}

export default Book;
