import { LOGIN, LOGOUT } from '../actions/user';
import { SET_ACTIVE_ITEM, TOGGLE_VISIBLE } from '../actions/nav';

const defaultState = {
  activeItem: '/',
  visible: false,
  fixed: false
};

const nav = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, defaultState);
    case LOGOUT:
      return Object.assign({}, state, defaultState);
    case SET_ACTIVE_ITEM:
      return Object.assign({}, state, {
        ...state,
        activeItem: action.activeItem
      });
    case TOGGLE_VISIBLE:
      return Object.assign({}, state, {
        ...state,
        visible: !state.visible
      });
    default:
      return state;
  }
};

export default nav;
