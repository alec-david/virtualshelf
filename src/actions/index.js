let nextBookId = 0;
export const addBook = title => {
  return {
    type: 'ADD_BOOK',
    id: nextBookId++,
    title
  };
};
