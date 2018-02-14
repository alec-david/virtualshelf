import {
  LOGIN,
  LOGOUT,
} from '../actions/index';

const defaultState = {
  token: '',
};

const user = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_NEW_USER':
      return { id: action.id };
    case 'DELETE_USER':
      return defaultState;
    case LOGIN:
      return Object.assign({}, state, {
        username: 'test'
      });
    case LOGOUT:
      return Object.assign({}, state, {
        username: ''
      });
    default:
      return state;
  }
};

export default user;
