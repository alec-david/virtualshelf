import { List } from 'immutable';
import {
  ADD_NEW_TELEVISION,
  ADD_EXISTING_TELEVISION,
  DELETE_TELEVISION,
  EDIT_TELEVISION,
  UPDATE_TELEVISION,
  FILTER_TELEVISION,
  SEARCH_TELEVISION
} from '../actions/television';
import {
  LOGIN,
  LOGOUT
} from '../actions/user';
import {
  sortObject,
  editObject,
  updateObject
} from './index';

let fullTelevisionList = List();

const television = (state = List(), action) => {
  switch (action.type) {
    case ADD_NEW_TELEVISION:
      const televisionObj = {
        ...action,
        edit: false
      };
      return state.insert(0, televisionObj);
    case ADD_EXISTING_TELEVISION:
      const televisionList = JSON.parse(action.television);
      const filterStr = '-date';
      return state.concat(televisionList.sort(sortObject(filterStr)));
    case DELETE_TELEVISION:
      return state.filter(television => television.id !== action.id);
    case EDIT_TELEVISION:
      return state = editObject(state, action);
    case UPDATE_TELEVISION:
      return state = updateObject(state, action);
    case FILTER_TELEVISION:
      let direction = action.filterDirection === 'DESC' ? '' : '-';
      const option = action.option;
      if (option === 'rating' || option === 'date') {
        direction = action.filterDirection === 'DESC' ? '-' : '';
      } 
      return state.sort(sortObject(direction + option));
    case SEARCH_TELEVISION:
      if (state.size > fullTelevisionList.size) {
        fullTelevisionList = state;
      }
      return filterSearch(action.search.toLowerCase(), fullTelevisionList);
    case LOGIN:
    case LOGOUT:
      return List();
    default:
      return state;
  }
};

function filterSearch(search, list) {
  return list.filter(television => {
    return (television.title.toLowerCase().indexOf(search) !== -1);
  })
}

export default television;
