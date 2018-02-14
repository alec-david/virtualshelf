import React from 'react';
import AddBook from '../../containers/books/AddBook';
import VisibleBookList from '../../containers/books/VisibleBookList';

const Books = () => (
  <div>
    Books You've Read:
    <VisibleBookList />
    Remembr a New Book:
    <AddBook />
  </div>
);

export default Books;
