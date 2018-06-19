import { List } from 'immutable';
import {
  ADD_NEW_BOOK,
  ADD_EXISTING_BOOKS,
  LOAD_MORE_BOOKS,
  DELETE_BOOK,
  EDIT_BOOK,
  UPDATE_BOOK,
  FILTER_BOOK,
  SEARCH_BOOK
} from '../actions/book';
import { LOGIN, LOGOUT } from '../actions/user';
import { binarySearch, sortObject, editObject, updateObject } from './index';

const DESC = 'DESC';

let fullBookList = List();

const defaultState = {
  list: List(),
  bookCount: 0,
  option: 'date',
  optionText: 'Date Read',
  filterDirection: DESC,
  search: '',
  loadedBooks: 50
};

const books = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_NEW_BOOK:
      const bookObj = {
        ...action,
        edit: false
      };
      const insertIndex = binarySearch(state, bookObj);
      return Object.assign({}, state, {
        list: state.list.insert(insertIndex, bookObj),
        bookCount: state.bookCount + 1
      });
    case ADD_EXISTING_BOOKS:
      const bookList = JSON.parse(action.books);
      const filterStr = '-date';
      return Object.assign({}, state, {
        list: state.list.concat(bookList.sort(sortObject(filterStr))),
        bookCount: bookList.length
      });
    case LOAD_MORE_BOOKS:
      return Object.assign({}, state, {
        loadedBooks: state.loadedBooks + 50
      });
    case DELETE_BOOK:
      const updatedList = state.list.filter(book => book.id !== action.id);
      return Object.assign({}, state, {
        list: updatedList,
        bookCount: updatedList.size
      });
    case EDIT_BOOK:
      return Object.assign({}, state, {
        list: editObject(state.list, action)
      });
    case UPDATE_BOOK:
      return Object.assign({}, state, {
        list: updateObject(state.list, action)
      });
    case FILTER_BOOK:
      let direction = action.filterDirection === DESC ? '' : '-';
      const option = action.option;
      if (option === 'rating' || option === 'date') {
        direction = action.filterDirection === DESC ? '-' : '';
      }
      return Object.assign({}, state, {
        ...action,
        list: state.list.sort(sortObject(direction + option))
      });
    case SEARCH_BOOK:
      if (state.list.size > fullBookList.size) {
        fullBookList = state.list;
      }
      return Object.assign({}, state, {
        search: action.search,
        list: filterSearch(action.search.toLowerCase(), fullBookList)
      });
    case LOGIN:
    case LOGOUT:
      return defaultState;
    default:
      return state;
  }
};

function filterSearch(search, list) {
  return list.filter(book => {
    return (
      book.author.toLowerCase().indexOf(search) !== -1 ||
      book.title.toLowerCase().indexOf(search) !== -1
    );
  });
}

export default books;
