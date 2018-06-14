import React from 'react';
import { Card } from 'semantic-ui-react';

import MovieCard from '../../containers/movies/MovieCard';
import NewMovieCard from '../../containers/movies/NewMovieCard';
import SrcText from '../util/SrcText';

const MovieList = props => {
  const { user, movies } = props;

  const addNewMovie = user.email ? <NewMovieCard /> : '';

  return (
    <div>
      <Card.Group centered>
        {addNewMovie}

        {movies.list.slice(0, movies.loadedMovies).map(movie => {
          return <MovieCard key={movie.id} movie={movie} />;
        })}
      </Card.Group>
      <SrcText itemCount={movies.movieCount} />
    </div>
  );
};

export default MovieList;
