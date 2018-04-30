import {
  LOGIN,
  LOGOUT
} from '../actions/user';
import {
  FILTER_ITEM,
  SEARCH_ITEM
} from '../actions/item';

const defaultState = {
  filter: 'date',
  direction: 'DESC',
  search: ''
};

const items = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN:
    case LOGOUT:
      return Object.assign({}, state, defaultState);
    case FILTER_ITEM:
      return Object.assign({}, state, {
        filter: action.option,
        direction: action.filterDirection
      });
    case SEARCH_ITEM:
      return Object.assign({}, state, {
        search: action.search
      });
    default:
      return state;
  }
}

export default items;