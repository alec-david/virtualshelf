import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import televisionImg from '../../imgs/television.svg';

import TelevisionCardContent from './TelevisionCardContent';

const Television = props => {
  const { television, user, handleSettings } = props;

  const bleh = {
    height: 150 + 'px'
  };

  return (
    <Card raised={true}>
      <Image
        src={television.image_url ? television.image_url : televisionImg}
        style={bleh}
        centered={true}
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
