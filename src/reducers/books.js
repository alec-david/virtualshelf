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
      return state.concat(bookList);
    case DELETE_BOOK:
      return state.filter(book => book.id !== action.id);
    case EDIT_BOOK:
      return state = editObject(state, action);
    case UPDATE_BOOK:
      return state = updateObject(state, action);
    case FILTER_BOOK:
      let direction = action.filterDirection === 'DESC' ? '' : '-';
      switch (action.option) {
        case 'Rating':
          direction = action.filterDirection === 'DESC' ? '-' : '';
          return state = state.sort(sortObject(direction + 'rating'));
        case 'Date Read':
          return state = state.sort(sortObject(direction + 'date_read'));
        case 'Title':
          return state = state.sort(sortObject(direction + 'title'));
        case 'Author':
          return state = state.sort(sortObject(direction + 'author'));
        default:
          return state;
      }
    case LOGIN:
    case LOGOUT:
      return state = List();
    default:
      return state;
  }
};

function filterObject(search, list) {
  return list.filter(book => {
    return (book.author.indexOf(search) !== -1 || book.title.indexOf(search) !== -1);
  })
}

function sortObject(property) {
  let sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return (a, b) => {
    let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    return result * sortOrder;
  }
}

function editObject(list, action) {
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

function updateObject(list, action) {
  return list.update(
    list.findIndex(item => {
      return item.id === action.id;
    }), item => {
      const editItem = {
        ...action,
        edit: false
      }
      return editItem;
    }
  );
}

export default books;
