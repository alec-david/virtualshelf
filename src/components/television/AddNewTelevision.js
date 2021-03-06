import React from 'react';

import { Card, Image } from 'semantic-ui-react';
import plusImg from '../../imgs/plus.png';

const imageStyle = {
  cursor: 'pointer',
  height: 200 + 'px'
};

const AddNewTelevision = props => (
  <Card>
    <Image src={plusImg} onClick={props.addNewTelevision} style={imageStyle} fluid centered />
    <Card.Content>
      <Card.Header>Add a new television show</Card.Header>
    </Card.Content>
  </Card>
);

export default AddNewTelevision;
