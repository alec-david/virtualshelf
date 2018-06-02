import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

import FilterMovie from '../../containers/movies/FilterMovie';
import VisibleMovieList from '../../containers/movies/VisibleMovieList';

const MoviePage = props => {
  const pageHeader = props.loggedIn ? `Movies You've Watched:` : `Movies Others Have Watched:`;

  const filterPadding = {
    paddingLeft: window.innerWidth * 0.025 + 'px'
  };

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
