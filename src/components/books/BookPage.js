import React from 'react';
import VisibleBookList from '../../containers/books/VisibleBookList';
import { Header, Icon } from 'semantic-ui-react';

const BookPage = () => (
  <div>
    <Header as='h2'>
      <Icon name='book' />
      <Header.Content>
        Books You've Read:
      </Header.Content>
    </Header>
    <VisibleBookList />
  </div>
);

export default BookPage;
