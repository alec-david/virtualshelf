import React from 'react';
import { Header } from 'semantic-ui-react';

import FilterMain from '../../containers/main/FilterMain';
import VisibleItemList from '../../containers/main/VisibleItemList';

const filterPadding = {
  paddingLeft: window.innerWidth * 0.025 + 'px'
};

const Main = () => (
  <div>
    <div style={filterPadding}>
      <Header as="h1">
        <Header.Content>Virtual Shelf</Header.Content>
      </Header>
      <FilterMain />
    </div>
    <br />
    <VisibleItemList />
  </div>
);

export default Main;
