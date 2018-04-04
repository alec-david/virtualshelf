import {
  LOGIN,
  LOGOUT
} from '../actions/user';

const defaultState = {
  token: '',
  email: '',
  loggingIn: true
};

const user = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, {
        token: action.token,
        email: action.email,
        loggingIn: false
      });
    case LOGOUT:
      return Object.assign({}, state, {
        token: '',
        email: '',
        loggingIn: false
      });
    default:
      return state;
  }
};

export default user;
