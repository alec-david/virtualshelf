import { List } from 'immutable';
import {
  ADD_NEW_BOOK,
  ADD_EXISTING_BOOKS,
  DELETE_BOOK
} from '../actions/index'

const books = (state = List(), action) => {
  switch (action.type) {
    case ADD_NEW_BOOK:
      return state.push({
        id: action.id,
        title: action.title,
        author: action.author,
        date_read: action.date_read,
        rating: action.rating
      });
    case ADD_EXISTING_BOOKS:
      return state.concat(JSON.parse(action.books));
    case DELETE_BOOK:
      console.log(action.id);
      return state.filter(book => book.id !== action.id);
    default:
      return state;
  }
};

export default books;
