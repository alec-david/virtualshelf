import { combineReducers } from 'redux';
import books from './books';
import movies from './movies';
import television from './television';

const remembrApp = combineReducers({
  books,
  movies,
  television
});

export default remembrApp;
