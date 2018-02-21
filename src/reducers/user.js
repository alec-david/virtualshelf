import {
  LOGIN,
  LOGOUT
} from '../actions/index';

const defaultState = {
  token: '',
};

const user = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, {
        token: action.token
      });
    case LOGOUT:
      return Object.assign({}, state, {
        token: ''
      });
    case 'DELETE_USER':
      return defaultState;
    default:
      return state;
  }
};

export default user;
