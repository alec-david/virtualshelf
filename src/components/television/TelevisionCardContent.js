import React from 'react';
import { Card, Rating } from 'semantic-ui-react';

import CardSettings from '../util/CardSettings';

const TelevisionCardContent = props => {
  const { television, handleSettings, email } = props;
  const formattedDate = new Date(television.date).toLocaleDateString();
  const episodeStr = television.episode ? `Episode ${television.episode}` : '';

  return (
    <Card.Content>
      <Card.Header>
        <CardSettings email={email} handleSettings={handleSettings} item={television} />
        {television.title}
      </Card.Header>
      <Card.Meta>
        Season {television.season} {episodeStr}
        <br />
        {formattedDate} -{' '}
        <Rating maxRating={5} icon="star" rating={television.rating} disabled size="mini" />
      </Card.Meta>
      <Card.Description>{television.description}</Card.Description>
    </Card.Content>
  );
};

export default TelevisionCardContent;
