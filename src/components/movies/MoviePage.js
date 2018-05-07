import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

import FilterMovie from '../../containers/movies/FilterMovie';
import VisibleMovieList from '../../containers/movies/VisibleMovieList';

const MoviePage = props => {
  const pageHeader = props.loggedIn ? `Movies You've Watched:` : `Movies Others Have Watched:`;
  return (
    <div>
      <Header as="h2">
        <Icon name="film" />
        <Header.Content>{pageHeader}</Header.Content>
      </Header>
      <FilterMovie />
      <br />
      <VisibleMovieList />
    </div>
  );
};

export default MoviePage;
