import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import movieImg from '../../imgs/movie.png';

import MovieCardContent from './MovieCardContent';

const imgStyle = {
  height: 300 + 'px'
};

const Movie = props => {
  const { movie, user, handleSettings } = props;

  return (
    <Card raised>
      <Image
        src={movie.image_url ? movie.image_url : movieImg}
        style={imgStyle}
        centered
        title={movie.image_url}
      />
      <MovieCardContent movie={movie} handleSettings={handleSettings} email={user.email} />
    </Card>
  );
};

export default Movie;
