import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import movieImg from '../../imgs/movie.svg';

import MovieCardContent from './MovieCardContent';

const Movie = (props) => {
  const { movie, user, handleSettings } = props;

  return (
    <Card>
      <Image src={movieImg} />
      <MovieCardContent
        movie={movie}
        handleSettings={handleSettings}
        email={user.email}
      />
    </Card>
  )
}

export default Movie;
