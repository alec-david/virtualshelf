import React from 'react';
import {Card, Image, Rating } from 'semantic-ui-react';

const BookCardContent= (props) => {
  const { book } = props;
  const formattedDate = new Date(book.date_read).toLocaleDateString();
  
  return (
    <Card.Content>
      <Card.Header>
        {book.title}
      </Card.Header>
      <Card.Meta>{book.author}</Card.Meta>
      <Card.Description>
        {formattedDate}
        <br/>
        <Rating
          maxRating={5}
          icon='star'
          rating={book.rating}
          disabled
        />
      </Card.Description>
    </Card.Content>
  )
}

export default BookCardContent;