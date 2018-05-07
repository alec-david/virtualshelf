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
import { LOGIN, LOGOUT } from '../actions/user';
import { binarySearch, sortObject, editObject, updateObject } from './index';

const DESC = 'DESC';

let fullMovieList = List();

const defaultState = {
  list: List(),
  movieCount: 0,
  option: 'date',
  optionText: 'Date Watched',
  filterDirection: DESC,
  search: ''
};

const movies = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_NEW_MOVIE:
      const movieObj = {
        ...action,
        edit: false
      };
      const insertIndex = binarySearch(state, movieObj);
      return Object.assign({}, state, {
        list: state.list.insert(insertIndex, movieObj),
        movieCount: state.movieCount + 1
      });
    case ADD_EXISTING_MOVIES:
      const movieList = JSON.parse(action.movies);
      const filterStr = '-date';
      return Object.assign({}, state, {
        list: state.list.concat(movieList.sort(sortObject(filterStr))),
        movieCount: movieList.length
      });
    case DELETE_MOVIE:
      return Object.assign({}, state, {
        list: state.list.filter(movie => movie.id !== action.id),
        movieCount: state.movieCount - 1
      });
    case EDIT_MOVIE:
      return Object.assign({}, state, {
        list: editObject(state.list, action)
      });
    case UPDATE_MOVIE:
      return Object.assign({}, state, {
        list: updateObject(state.list, action)
      });
    case FILTER_MOVIE:
      let direction = action.filterDirection === 'DESC' ? '' : '-';
      const option = action.option;
      if (option === 'rating' || option === 'date') {
        direction = action.filterDirection === 'DESC' ? '-' : '';
      }
      return Object.assign({}, state, {
        ...action,
        list: state.list.sort(sortObject(direction + option))
      });
    case SEARCH_MOVIE:
      if (state.list.size > fullMovieList.size) {
        fullMovieList = state.list;
      }
      return Object.assign({}, state, {
        search: action.search,
        list: filterSearch(action.search.toLowerCase(), fullMovieList)
      });
    case LOGIN:
    case LOGOUT:
      return defaultState;
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
  });
}

export default movies;
