import { List } from 'immutable';

const books = (state = List(), action) => {
  switch (action.type) {
    case 'ADD_BOOK':
      return state.push({
        id: action.id,
        title: action.title,
        author: action.author,
        date: action.date
      });
    case 'DELETE_BOOK':
      return state.filter(book => book.id !== action.id);
    default:
      return state;
  }
};

export default books;
