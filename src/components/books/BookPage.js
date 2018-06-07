import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

import FilterBook from '../../containers/books/FilterBook';
import VisibleBookList from '../../containers/books/VisibleBookList';

const filterPadding = {
  paddingLeft: window.innerWidth * 0.025 + 'px'
};

const BookPage = props => {
  const pageHeader = props.itemCount
    ? props.loggedIn
      ? `Books You've Read:`
      : `Books Others Have Read:`
    : `Get Started by Adding a Book!`;

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
