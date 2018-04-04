import { List } from 'immutable';
import {
  LOGIN,
  LOGOUT
} from '../actions/user';

let fullTelevisionList = List();

const movies = (state = List(), action) => {
  switch (action.type) {
    case 'ADD_NEW_TELEVISION':
      const televisionObj = {
        ...action,
        edit: false
      };
      return state.insert(0, televisionObj);
    case 'ADD_EXISTING_TELEVISION':
      //TODO
      return state;
    case 'DELETE_TELEVISION':
      return state.filter(television => television.id !== action.id);
    case 'EDIT_TELEVISION':
      //TODO
      return state;
    case 'UPDATE_TELEVISION':
      //TODO
      return state;
    case 'FILTER_TELEVISION':
      //TODO
      return state;
    case 'SEARCH_TELEVISION':
      //TODO
      return state;
    case LOGIN:
    case LOGOUT:
      return state = List();
    default:
      return state;
  }
};

export default movies;
