import { List } from 'immutable';
import {
  ADD_NEW_MOVIE,
  ADD_EXISTING_MOVIES,
  DELETE_MOVIE,
  EDIT_MOVIE,
  UPDATE_MOVIE,
  FILTER_MOVIE,
  SEARCH_MOVIE
} from '../actions/movie';
import {
  LOGIN,
  LOGOUT
} from '../actions/user';
import {
  sortObject,
  editObject,
  updateObject
} from './index';

let fullMovieList = List();

const movies = (state = List(), action) => {
  switch (action.type) {
    case ADD_NEW_MOVIE:
      const movieObj = {
        ...action,
        edit: false
      };
      return state.insert(0, movieObj);
    case ADD_EXISTING_MOVIES:
      const movieList = JSON.parse(action.movies);
      const filterStr = '-date_read';
      return state.concat(movieList.sort(sortObject(filterStr)));
    case DELETE_MOVIE:
      return state.filter(movie => movie.id !== action.id);
    case EDIT_MOVIE:
      return state = editObject(state, action);
    case UPDATE_MOVIE:
      return state = updateObject(state, action);
    case FILTER_MOVIE:
      let direction = action.filterDirection === 'DESC' ? '' : '-';
      switch (action.option) {
        case 'Rating':
          direction = action.filterDirection === 'DESC' ? '-' : '';
          return state.sort(sortObject(direction + 'rating'));
        case 'Date Watched':
          direction = action.filterDirection === 'DESC' ? '-' : '';
          return state.sort(sortObject(direction + 'date_watched'));
        case 'Title':
          return state.sort(sortObject(direction + 'title'));
        case 'Director':
          return state.sort(sortObject(direction + 'director'));
        default:
          return state;
      }
    case SEARCH_MOVIE:
      if (state.size > fullMovieList.size) {
        fullMovieList = state;
      }
      return filterSearch(action.search.toLowerCase(), fullMovieList);
    case LOGIN:
    case LOGOUT:
      return List();
    default:
      return state;
  }
};

function filterSearch(search, list) {
  return list.filter(movie => {
    return (
      movie.director.toLowerCase().indexOf(search) !== -1 ||
      movie.title.toLowerCase().indexOf(search) !== -1
    );
  })
}

export default movies;
