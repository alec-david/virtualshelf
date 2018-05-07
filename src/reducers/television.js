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
import { LOGIN, LOGOUT } from '../actions/user';
import { binarySearch, sortObject, editObject, updateObject } from './index';

const DESC = 'DESC';

let fullTelevisionList = List();

const defaultState = {
  list: List(),
  televisionCount: 0,
  option: 'date',
  optionText: 'Date Watched',
  filterDirection: DESC,
  search: ''
};

const television = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_NEW_TELEVISION:
      const televisionObj = {
        ...action,
        edit: false
      };
      const insertIndex = binarySearch(state, televisionObj);
      return Object.assign({}, state, {
        list: state.list.insert(insertIndex, televisionObj),
        televisionCount: state.televisionCount + 1
      });
    case ADD_EXISTING_TELEVISION:
      const televisionList = JSON.parse(action.television);
      const filterStr = '-date';
      return Object.assign({}, state, {
        list: state.list.concat(televisionList.sort(sortObject(filterStr))),
        televisionCount: televisionList.length
      });
    case DELETE_TELEVISION:
      return Object.assign({}, state, {
        list: state.list.filter(television => television.id !== action.id),
        televisionCount: state.televisionCount - 1
      });
    case EDIT_TELEVISION:
      return Object.assign({}, state, {
        list: editObject(state.list, action)
      });
    case UPDATE_TELEVISION:
      return Object.assign({}, state, {
        list: updateObject(state.list, action)
      });
    case FILTER_TELEVISION:
      let direction = action.filterDirection === 'DESC' ? '' : '-';
      const option = action.option;
      if (option === 'rating' || option === 'date') {
        direction = action.filterDirection === 'DESC' ? '-' : '';
      }
      return Object.assign({}, state, {
        ...action,
        list: state.list.sort(sortObject(direction + option))
      });
    case SEARCH_TELEVISION:
      if (state.list.size > fullTelevisionList.size) {
        fullTelevisionList = state.list;
      }
      return Object.assign({}, state, {
        search: action.search,
        list: filterSearch(action.search.toLowerCase(), fullTelevisionList)
      });
    case LOGIN:
    case LOGOUT:
      return defaultState;
    default:
      return state;
  }
};

function filterSearch(search, list) {
  return list.filter(television => {
    return television.title.toLowerCase().indexOf(search) !== -1;
  });
}

export default television;
