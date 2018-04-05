import React from 'react';
import { Card } from 'semantic-ui-react';

import TelevisionCard from '../../containers/television/TelevisionCard';
import NewTelevisionCard from '../../containers/television/NewTelevisionCard';

const TelevisionList = (props) => {
  const { user, television } = props;
  let addNewTelevision;
  if (user.email) {
    addNewTelevision = <NewTelevisionCard />
  }

  return (
    <div>
      <Card.Group itemsPerRow={props.colNum}>
        {addNewTelevision}

        {television.map(television => {
          return (
            <TelevisionCard
              key={television.id}
              television={television}
              delete={props.delete}
              edit={props.edit}
            />
          );
        })}
      </Card.Group>
    </div>
  );
}

export default TelevisionList;
