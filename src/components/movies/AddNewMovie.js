import React from 'react';

import { Card, Image } from 'semantic-ui-react';
import plusImg from '../../imgs/plus.png';

const imageStyle = {
  cursor: 'pointer',
  height: 300 + 'px'
};

const AddNewMovie = props => (
  <Card>
    <Image src={plusImg} onClick={props.addNewMovie} style={imageStyle} fluid centered />
    <Card.Content>
      <Card.Header>Add a new movie</Card.Header>
    </Card.Content>
  </Card>
);

export default AddNewMovie;
