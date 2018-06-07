import React from 'react';

import { Card, Image } from 'semantic-ui-react';
// import plusImg from '../../imgs/plus.svg';
import plusImg from '../../imgs/plus6.png'

const imageStyle = {
  cursor: 'pointer',
  height: 300 + 'px'
};

const AddNewBook = props => (
  <Card>
    <Image src={plusImg} onClick={props.addNewBook} style={imageStyle} fluid centered />
    <Card.Content>
      <Card.Header>Add a new book</Card.Header>
    </Card.Content>
  </Card>
);

export default AddNewBook;
