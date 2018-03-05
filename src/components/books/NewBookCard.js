import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import plusImg from '../../imgs/plus.svg';

const imageStyle = {
  cursor: 'pointer'
}

const NewBookCard = (props) => {
  const { addBook } = props;
  return (
    <Card>
      <Image 
        src={plusImg} 
        onClick={addBook}
        style={imageStyle}
      />
      <Card.Content>
        <Card.Header>
          Add a new book.
        </Card.Header>
      </Card.Content>
    </Card>
  )
}

export default NewBookCard;