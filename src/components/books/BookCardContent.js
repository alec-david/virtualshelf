import React from 'react';
import { Card, Rating } from 'semantic-ui-react';

import CardSettings from '../util/CardSettings';

const BookCardContent = (props) => {
  const { book, handleSettings, email } = props;
  const formattedDate = new Date(book.date).toLocaleDateString();

  return (
    <Card.Content>
      <Card.Header>
        <CardSettings 
          email={email}
          handleSettings={handleSettings}
        />
        {book.title}
      </Card.Header>
      <Card.Meta>
        {book.author} <br />
        {formattedDate} - {' '}
        <Rating
          maxRating={5}
          icon='star'
          rating={book.rating}
          disabled
          size='mini'
        />
      </Card.Meta>
      <Card.Description>
        {book.description}
      </Card.Description>
    </Card.Content>
  )
}

export default BookCardContent;