import React from 'react';
import { Card, Rating } from 'semantic-ui-react';

import CardSettings from '../util/CardSettings';

const MovieCardContent = (props) => {
  const { movie, handleSettings, email } = props;
  // console.log(movie);
  const formattedDate = new Date(movie.date).toLocaleDateString();

  return (
    <Card.Content>
      <Card.Header>
        <CardSettings 
          email={email}
          handleSettings={handleSettings}
        />
        {movie.title}
      </Card.Header>
      <Card.Meta>
        {movie.director} <br />
        {formattedDate} - {' '}
        <Rating
          maxRating={5}
          icon='star'
          rating={movie.rating}
          disabled
          size='mini'
        />
      </Card.Meta>
      <Card.Description>
        {movie.description}
      </Card.Description>
    </Card.Content>
  )
}

export default MovieCardContent;