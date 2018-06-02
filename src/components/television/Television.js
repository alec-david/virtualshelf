import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import televisionImg from '../../imgs/television.svg';

import TelevisionCardContent from './TelevisionCardContent';

const imgStyle = {
  height: 175 + 'px'
};

const Television = props => {
  const { television, user, handleSettings } = props;

  return (
    <Card raised>
      <Image
        src={television.image_url ? television.image_url : televisionImg}
        style={imgStyle}
        centered
        title={television.image_url}
      />
      <TelevisionCardContent
        television={television}
        handleSettings={handleSettings}
        email={user.email}
      />
    </Card>
  );
};

export default Television;
