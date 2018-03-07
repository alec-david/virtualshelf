import { List } from 'immutable';
import {
  ADD_NEW_BOOK,
  ADD_EXISTING_BOOKS,
  DELETE_BOOK,
  EDIT_BOOK,
  UPDATE_BOOK,
  FILTER_BOOK,
  LOGIN,
  LOGOUT
} from '../actions/index';

const fullBookList = List();

const books = (state = List(), action) => {
  switch (action.type) {
    case ADD_NEW_BOOK:
      const bookObj = {
        ...action,
        edit: false
      }
      fullBookList.insert(0, bookObj);
      return state.insert(0, bookObj);
    case ADD_EXISTING_BOOKS:
      const bookList = JSON.parse(action.books);
      fullBookList.concat(bookList);
      return state.concat(bookList);
    case DELETE_BOOK:
      fullBookList.filter(book => book.id !== action.id);
      return state.filter(book => book.id !== action.id);
    case EDIT_BOOK:
      fullBookList = updateObject(fullBookList, action);
      return state = updateObject(state, action);
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
    case FILTER_BOOK:
      console.log('yuhhh');
      return state;
    case LOGIN:
    case LOGOUT:
      return state = List();
    default:
      return state;
  }
};

function updateObject(list, action) {
  return list.update(
    list.findIndex(item => {
      return item.id === action.id;
    }), item => {
      const editItem = {
        ...item
      }
      editItem.edit = !editItem.edit;
      return editItem;
    }
  );
}

export default books;
