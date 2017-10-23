let nextBookId = 0;
export const addBook = book => {
  return {
    type: 'ADD_BOOK',
    id: nextBookId++,
    title: book.title,
    author: book.author,
    date: book.date
  };
};
