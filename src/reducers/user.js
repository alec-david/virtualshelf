import {
  LOGIN,
  LOGOUT,
} from '../actions/index';

const defaultState = {
  isLoggedIn: false,
  username: '',
  password: ''
}

const user = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_NEW_USER':
      return { id: action.id };
    case 'DELETE_USER':
      return defaultState;
    case LOGIN:
      return Object.assign({}, state, {
        isLoggedIn: true,
        username: action.username,
        password: action.password
      });
    case LOGOUT:
      return Object.assign({}, state, {
        isLoggedIn: false,
        username: '',
        password: ''
      });
    default:
      return state;
  }
};

export default user;
