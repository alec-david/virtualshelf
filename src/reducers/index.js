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

export default remembrApp;
