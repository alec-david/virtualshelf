import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

import FilterBook from '../../containers/books/FilterBook';
import VisibleBookList from '../../containers/books/VisibleBookList';

const BookPage = (props) => {
  const pageHeader = props.loggedIn ? `Books You've Read:` : `Books Others Have Read:`
  return (
    <div>
      <Header as='h2'>
        <Icon name='book' />
        <Header.Content>
          {pageHeader}
        </Header.Content>
      </Header>
      <FilterBook />
      <br /><br />
      <VisibleBookList />
    </div>
  );
};

export default BookPage;
