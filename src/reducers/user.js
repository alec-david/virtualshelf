import {
  LOGIN,
  LOGOUT,
  REGISTER
} from '../actions/index';

const defaultState = {
  token: '',
};

const user = (state = defaultState, action) => {
  switch (action.type) {
    case REGISTER:
      return Object.assign({}, state, {
        token: action.token
      })
    case 'DELETE_USER':
      return defaultState;
    case LOGIN:
      return Object.assign({}, state, {
        token: action.token
      });
    case LOGOUT:
      return Object.assign({}, state, {
        token: ''
      });
    default:
      return state;
  }
};

export default user;
