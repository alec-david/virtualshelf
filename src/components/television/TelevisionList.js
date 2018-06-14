import React from 'react';
import { Card } from 'semantic-ui-react';

import TelevisionCard from '../../containers/television/TelevisionCard';
import NewTelevisionCard from '../../containers/television/NewTelevisionCard';
import SrcText from '../util/SrcText';

const TelevisionList = props => {
  const { user, television } = props;

  const addNewTelevision = user.email ? <NewTelevisionCard /> : '';

  return (
    <div>
      <Card.Group centered>
        {addNewTelevision}

        {television.list.slice(0, television.loadedTelevision).map(television => {
          return <TelevisionCard key={television.id} television={television} />;
        })}
      </Card.Group>
      <SrcText itemCount={television.televisionCount} />
    </div>
  );
};

export default TelevisionList;
