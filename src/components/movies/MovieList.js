import React from 'react';
import { Card } from 'semantic-ui-react';

import MovieCard from '../../containers/movies/MovieCard';
import NewMovieCard from '../../containers/movies/NewMovieCard';

const MovieList = (props) => {
  const { user, movies } = props;
  let addNewMovie;
  if (user.email) {
    addNewMovie = <NewMovieCard />
  }

  return (
    <div>
      <Card.Group itemsPerRow={props.colNum}>
        {addNewMovie}

        {movies.map(movie => {
          return (
            <MovieCard
              key={movie.id}
              movie={movie}
              delete={props.delete}
              edit={props.edit}
            />
          );
        })}
      </Card.Group>
    </div>
  );
}

export default MovieList;
