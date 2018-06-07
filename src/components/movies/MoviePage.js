import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

import FilterMovie from '../../containers/movies/FilterMovie';
import VisibleMovieList from '../../containers/movies/VisibleMovieList';

const filterPadding = {
  paddingLeft: window.innerWidth * 0.025 + 'px'
};

const MoviePage = props => {
  const pageHeader = props.itemCount
    ? props.loggedIn
      ? `Movies You've Watched:`
      : `Movies Others Have Watched:`
    : `Get Started by Adding a Movie!`;

  return (
    <div>
      <div style={filterPadding}>
        <Header as="h2">
          <Icon name="film" />
          <Header.Content>{pageHeader}</Header.Content>
        </Header>
        <FilterMovie />
      </div>
      <br />
      <VisibleMovieList />
    </div>
  );
};

export default MoviePage;
