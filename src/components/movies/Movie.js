import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import movieImg from '../../imgs/movie.svg';

import MovieCardContent from './MovieCardContent';

const Movie = props => {
  const { movie, user, handleSettings } = props;

  const bleh = {
    height: 300 + 'px'
  };
  return (
    <Card raised={true}>
      <Image
        src={movie.image_url ? movie.image_url : movieImg}
        style={bleh}
        centered={true}
        title={movie.image_url}
      />
      <MovieCardContent movie={movie} handleSettings={handleSettings} email={user.email} />
    </Card>
  );
};

export default Movie;
