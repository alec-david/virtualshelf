import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

import FilterBook from '../../containers/books/FilterBook';
import VisibleBookList from '../../containers/books/VisibleBookList';

const BookPage = () => (
  <div>
    <Header as='h2'>
      <Icon name='book' />
      <Header.Content>
        Books You've Read:
      </Header.Content>
    </Header>
    <FilterBook />
    <br /><br />
    <VisibleBookList />
  </div>
);

export default BookPage;
