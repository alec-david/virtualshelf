import React from 'react';
import {Card, Button } from 'semantic-ui-react';

const BookCardButtons= (props) => {
  const { edit, deleteBook } = props;
  
  return (
    <Card.Content extra>
      <Button
        basic
        compact
        size='mini'
        floated='left'
        color='blue'
        onClick={edit.bind(this)}
      >
        Edit
      </Button>
      <Button
        basic
        compact
        size='mini'
        floated='right'
        color='red'
        onClick={deleteBook.bind(this)}
      >
        Delete
      </Button>
    </Card.Content>
  )
}

export default BookCardButtons;