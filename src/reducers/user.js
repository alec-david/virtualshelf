import {
  LOGIN,
  LOGOUT,
} from '../actions/index';

const defaultState = {
  access_token: '',
  id_token: '',
  expires_at: ''
};

const user = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_NEW_USER':
      return { id: action.id };
    case 'DELETE_USER':
      return defaultState;
    case LOGIN:
      return Object.assign({}, state, {
        access_token: action.access_token,
        id_token: action.id_token,
        expires_at: action.expires_at
      });
    case LOGOUT:
      return Object.assign({}, state, {
        access_token: '',
        id_token: '',
        expires_at: ''
      });
    default:
      return state;
  }
};

export default user;
