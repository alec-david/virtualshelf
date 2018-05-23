import React from 'react';
import { Card } from 'semantic-ui-react';

import TelevisionCard from '../../containers/television/TelevisionCard';
import NewTelevisionCard from '../../containers/television/NewTelevisionCard';

const TelevisionList = props => {
  const { user, television } = props;
  let addNewTelevision;
  if (user.email) {
    addNewTelevision = <NewTelevisionCard />;
  }

  let imgSrcText;
  if (television && television.size) {
    imgSrcText = 'All images sourced from https://www.wikipedia.org/';
  }

  return (
    <div>
      <div style={{ fontSize: 10 + 'px' }}>{imgSrcText}</div>
      <Card.Group centered doubling stackable>
        {addNewTelevision}

        {television.map(television => {
          return <TelevisionCard key={television.id} television={television} />;
        })}
      </Card.Group>
    </div>
  );
};

export default TelevisionList;
