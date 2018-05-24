import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

import FilterTelevision from '../../containers/television/FilterTelevision';
import VisibleTelevisionList from '../../containers/television/VisibleTelevisionList';

const filterPadding = {
  paddingLeft: '50px'
};

const MoviePage = props => {
  const pageHeader = props.loggedIn
    ? `Television You've Watched:`
    : `Television Others Have Watched:`;
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
