import React from 'react';
import { Card } from 'semantic-ui-react';

import MovieCard from '../../containers/movies/MovieCard';
import NewMovieCard from '../../containers/movies/NewMovieCard';

const MovieList = props => {
  const { user, movies } = props;
  let addNewMovie;
  if (user.email) {
    addNewMovie = <NewMovieCard />;
  }

  let imgSrcText;
  if (movies && movies.size) {
    imgSrcText = 'All images sourced from https://www.wikipedia.org/';
  }

  return (
    <div>
      <div style={{ fontSize: 10 + 'px' }}>{imgSrcText}</div>
      <Card.Group itemsPerRow={props.colNum}>
        {addNewMovie}

        {movies.map(movie => {
          return <MovieCard key={movie.id} movie={movie} />;
        })}
      </Card.Group>
    </div>
  );
};

export default MovieList;
