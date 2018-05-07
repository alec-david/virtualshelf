import React from 'react';
import { Header } from 'semantic-ui-react';

import FilterMain from '../../containers/main/FilterMain';
import VisibleItemList from '../../containers/main/VisibleItemList';

const Main = () => (
  <div>
    <Header as="h1">
      <Header.Content>Remembr</Header.Content>
    </Header>
    <FilterMain />
    <br />
    <VisibleItemList />
  </div>
);

export default Main;
