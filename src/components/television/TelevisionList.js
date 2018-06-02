import React from 'react';
import { Card } from 'semantic-ui-react';

import TelevisionCard from '../../containers/television/TelevisionCard';
import NewTelevisionCard from '../../containers/television/NewTelevisionCard';

const TelevisionList = props => {
  const { user, television } = props;

  const addNewTelevision = user.email ? <NewTelevisionCard /> : '';
  const srcText = television.televisionCount
    ? 'All images sourced from https://www.wikipedia.org/'
    : '';

  return (
    <div>
      <Card.Group centered>
        {addNewTelevision}

        {television.list.map(television => {
          return <TelevisionCard key={television.id} television={television} />;
        })}
      </Card.Group>
      <br />
      <span className="srcText">{srcText}</span>
    </div>
  );
};

export default TelevisionList;
