import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import televisionImg from '../../imgs/television.svg';

import TelevisionCardContent from './TelevisionCardContent';

const Television = (props) => {
  const { television, user, handleSettings } = props;

  return (
    <Card>
      <Image src={televisionImg} />
      <TelevisionCardContent
        television={television}
        handleSettings={handleSettings}
        email={user.email}
      />
    </Card>
  )
}

export default Television;
