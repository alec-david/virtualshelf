import { List } from 'immutable';
import {
  REQUEST_BOOKS,
  RECEIVE_BOOKS
} from '../actions/index'

const books = (state = List(), action) => {
  switch (action.type) {
    case 'ADD_NEW_BOOK':
      return state.push({
        id: action.id,
        title: action.title,
        author: action.author,
        date: action.date
      });
    case 'DELETE_BOOK':
      return state.filter(book => book.id !== action.id);
    case 'ADD_EXISTING_BOOKS':
      return state.concat(JSON.parse(action.books));
    default:
      return state;
  }
};

export default books;
