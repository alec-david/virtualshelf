import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

import FilterTelevision from '../../containers/television/FilterTelevision';
import VisibleTelevisionList from '../../containers/television/VisibleTelevisionList';

const MoviePage = (props) => {
  const pageHeader = props.loggedIn ? `Television You've Watched:` : `Television Others Have Watched:`
  return (
    <div>
      <Header as='h2'>
        <Icon name='tv' />
        <Header.Content>
          {pageHeader}
        </Header.Content>
      </Header>
      <FilterTelevision />
      <br /><br />
      <VisibleTelevisionList />
    </div>
  );
};

export default MoviePage;
