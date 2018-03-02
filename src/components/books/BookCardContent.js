import React from 'react';
import { Card, Image, Rating } from 'semantic-ui-react';

const BookCardContent = (props) => {
  const { book } = props;
  const formattedDate = new Date(book.date_read).toLocaleDateString();

  return (
    <Card.Content>
      <Card.Header>
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