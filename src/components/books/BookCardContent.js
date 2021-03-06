import React from 'react';
import { Card, Rating } from 'semantic-ui-react';

import CardSettings from '../util/CardSettings';

const BookCardContent = props => {
  const { book, handleSettings, email } = props;
  const formattedDate = new Date(book.date).toLocaleDateString();

  return (
    <Card.Content>
      <Card.Header>
        <CardSettings email={email} handleSettings={handleSettings} item={book} />
        {book.title}
      </Card.Header>
      <Card.Meta>
        {book.author} <br />
        {formattedDate} -{' '}
        <Rating maxRating={5} icon="star" rating={book.rating} disabled size="small" />
      </Card.Meta>
      <Card.Description style={{ wordWrap: 'break-word' }}>{book.description}</Card.Description>
    </Card.Content>
  );
};

export default BookCardContent;
