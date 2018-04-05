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
      const filterStr = '-date_read';
      return state.concat(televisionList.sort(sortObject(filterStr)));
    case DELETE_TELEVISION:
      return state.filter(television => television.id !== action.id);
    case EDIT_TELEVISION:
      return state = editObject(state, action);
    case UPDATE_TELEVISION:
      return state = updateObject(state, action);
    case FILTER_TELEVISION:
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
        default:
          return state;
      }
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
