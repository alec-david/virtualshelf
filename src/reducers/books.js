import { List } from 'immutable';
import {
  ADD_NEW_BOOK,
  ADD_EXISTING_BOOKS,
  DELETE_BOOK,
  EDIT_BOOK,
  UPDATE_BOOK,
  FILTER_BOOK,
  SEARCH_BOOK
} from '../actions/book';
import {
  LOGIN,
  LOGOUT
} from '../actions/user';
import {
  sortObject,
  editObject,
  updateObject
} from './index';

let fullBookList = List();

const books = (state = List(), action) => {
  switch (action.type) {
    case ADD_NEW_BOOK:
      const bookObj = {
        ...action,
        edit: false
      }
      return state.insert(0, bookObj);
    case ADD_EXISTING_BOOKS:
      const bookList = JSON.parse(action.books);
      const filterStr = '-date';
      return state.concat(bookList.sort(sortObject(filterStr)));
    case DELETE_BOOK:
      return state.filter(book => book.id !== action.id);
    case EDIT_BOOK:
      return state = editObject(state, action);
    case UPDATE_BOOK:
      console.log(action);
      return state = updateObject(state, action);
    case FILTER_BOOK:
      let direction = action.filterDirection === 'DESC' ? '' : '-';
      const option = action.option;
      if (option === 'rating' || option === 'date') {
        direction = action.filterDirection === 'DESC' ? '-' : '';
      }
      return state.sort(sortObject(direction + option));
    case SEARCH_BOOK:
      if (state.size > fullBookList.size) {
        fullBookList = state;
      }
      return filterSearch(action.search.toLowerCase(), fullBookList);
    case LOGIN:
    case LOGOUT:
      return List();
    default:
      return state;
  }
};

function filterSearch(search, list) {
  return list.filter(book => {
    return (book.author.toLowerCase().indexOf(search) !== -1 || book.title.toLowerCase().indexOf(search) !== -1);
  })
}

export default books;
