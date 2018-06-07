import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

import FilterTelevision from '../../containers/television/FilterTelevision';
import VisibleTelevisionList from '../../containers/television/VisibleTelevisionList';

const filterPadding = {
  paddingLeft: window.innerWidth * 0.025 + 'px'
};

const MoviePage = props => {
  const pageHeader = props.itemCount
    ? props.loggedIn
      ? `Television You've Watched:`
      : `Television Others Have Watched:`
    : `Get Started by Adding a TV Show!`;

  return (
    <div>
      <div style={filterPadding}>
        <Header as="h2">
          <Icon name="tv" />
          <Header.Content>{pageHeader}</Header.Content>
        </Header>
        <FilterTelevision />
      </div>
      <br />
      <VisibleTelevisionList />
    </div>
  );
};

export default MoviePage;
