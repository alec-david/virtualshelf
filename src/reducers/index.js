import { combineReducers } from 'redux';
import books from './books';
import movies from './movies';
import television from './television';
import items from './items';
import user from './user';
import nav from './nav';
import { reducer as reduxFormReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';

const remembrApp = combineReducers({
  books,
  movies,
  television,
  items,
  user,
  nav,
  form: reduxFormReducer,
  toastr: toastrReducer
});

export const binarySearch = (state, item) => {
  const { list, option, filterDirection } = state;
  let low = 0;
  let high = list.size - 1;

  let searchDirection = filterDirection === 'DESC';
  if (option === 'title' || option === 'author' || option === 'director') {
    searchDirection = !searchDirection;
  }

  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    let midVal = list.get(mid)[option];
    let itemVal = item[option];
    if (option === 'title' || option === 'author' || option === 'director') {
      midVal = midVal.toLowerCase();
      itemVal = itemVal.toLowerCase();
    }
    if (midVal === itemVal) {
      return mid;
    } else if (midVal > itemVal) {
      if (searchDirection) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    } else {
      if (searchDirection) {
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }
  }
  return low;
};

export const sortObject = property => {
  let sortOrder = 1;
  if (property[0] === '-') {
    sortOrder = -1;
    property = property.substr(1);
  }
  //If comparing strings, set all strings lowercase in comparison
  if (property === 'title' || property === 'author' || property === 'director') {
    return (a, b) => {
      let result =
        a[property].toLowerCase() < b[property].toLowerCase()
          ? -1
          : a[property].toLowerCase() > b[property].toLowerCase()
            ? 1
            : 0;
      return result * sortOrder;
    };
  }
  return (a, b) => {
    let result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
};

export const editObject = (list, action) => {
  return list.update(
    list.findIndex(item => {
      return item.id === action.id;
    }),
    item => {
      const editItem = {
        ...item
      };
      editItem.edit = !editItem.edit;
      return editItem;
    }
  );
};

export const updateObject = (list, action) => {
  return list.update(
    list.findIndex(item => {
      return item.id === action.id;
    }),
    item => {
      const editItem = {
        ...action,
        edit: false
      };
      return editItem;
    }
  );
};

export default remembrApp;
