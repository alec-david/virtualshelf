import { combineReducers } from 'redux';
import books from './books';
import movies from './movies';
import television from './television';
import { reducer as reduxFormReducer } from 'redux-form';

const remembrApp = combineReducers({
  books,
  movies,
  television,
  form: reduxFormReducer
});

export default remembrApp;
