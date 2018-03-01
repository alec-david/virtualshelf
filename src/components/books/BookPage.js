import React from 'react';
import AddBook from '../../containers/books/AddBook';
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
    Remembr a New Book:
    <AddBook />
  </div>
);

export default BookPage;
