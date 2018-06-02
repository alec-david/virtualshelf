import React from 'react';
import { Card } from 'semantic-ui-react';

import MovieCard from '../../containers/movies/MovieCard';
import NewMovieCard from '../../containers/movies/NewMovieCard';

const MovieList = props => {
  const { user, movies } = props;

  const addNewMovie = user.email ? <NewMovieCard /> : '';
  const srcText = movies.movieCount ? 'All images sourced from https://www.wikipedia.org/' : '';

  return (
    <div>
      <Card.Group centered>
        {addNewMovie}

        {movies.list.slice(0, movies.loadedMovies).map(movie => {
          return <MovieCard key={movie.id} movie={movie} />;
        })}
      </Card.Group>
      <br />
      <span className="srcText">{srcText}</span>
    </div>
  );
};

export default MovieList;
