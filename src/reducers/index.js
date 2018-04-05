import { combineReducers } from 'redux';
import books from './books';
import movies from './movies';
import television from './television';
import user from './user';
import { reducer as reduxFormReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr'

const remembrApp = combineReducers({
  books,
  movies,
  television,
  user,
  form: reduxFormReducer,
  toastr: toastrReducer
});

export const sortObject = property => {
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

export const editObject = (list, action) => {
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

export const updateObject = (list, action) => {
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

export default remembrApp;
