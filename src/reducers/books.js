import { List } from 'immutable';
import {
  ADD_NEW_BOOK,
  ADD_EXISTING_BOOKS,
  DELETE_BOOK,
  EDIT_BOOK,
  UPDATE_BOOK,
  LOGIN,
  LOGOUT
} from '../actions/index';

const books = (state = List(), action) => {
  switch (action.type) {
    case ADD_NEW_BOOK:
      return state.push({
        id: action.id,
        title: action.title,
        author: action.author,
        date_read: action.date_read,
        rating: action.rating,
        description: action.description,
        edit: false
      });
    case ADD_EXISTING_BOOKS:
      return state.concat(JSON.parse(action.books));
    case DELETE_BOOK:
      return state.filter(book => book.id !== action.id);
    case EDIT_BOOK:
      return state = state.update(
        state.findIndex(item => {
          return item.id === action.id;
        }), item => {
          const editItem = {
            ...item
          }
          editItem.edit = !editItem.edit;
          return editItem;

        }
      );
    case UPDATE_BOOK:
      return state = state.update(
        state.findIndex(item => {
          return item.id === action.id;
        }), item => {
          const editItem = {
            id: action.id,
            title: action.title,
            author: action.author,
            date_read: action.date_read,
            rating: action.rating,
            description: action.description,
            edit: false
          }
          return editItem;

        }
      );
    case LOGIN:
    case LOGOUT:
      return state = List();
    default:
      return state;
  }
};

export default books;
