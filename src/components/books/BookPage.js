import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

import FilterBook from '../../containers/books/FilterBook';
import VisibleBookList from '../../containers/books/VisibleBookList';

const filterPadding = {
  paddingLeft: '50px'
};

const BookPage = props => {
  const pageHeader = props.loggedIn ? `Books You've Read:` : `Books Others Have Read:`;
  return (
    <div>
      <div style={filterPadding}>
        <Header as="h2">
          <Icon name="book" />
          <Header.Content>{pageHeader}</Header.Content>
        </Header>
        <FilterBook />
      </div>
      <br />
      <VisibleBookList />
    </div>
  );
};

export default BookPage;
