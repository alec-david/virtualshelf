import {
  LOGIN,
  LOGOUT,
  HYDRATED_ALL,
  HYDRATED_BOOKS,
  HYDRATED_MOVIES,
  HYDRATED_TELEVISION
} from '../actions/user';

const defaultState = {
  token: '',
  email: '',
  loggingIn: true,
  hydratedBooks: false,
  hydratedMovies: false,
  hydratedTelevision: false,
  verified: false
};

const user = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, {
        token: action.token,
        email: action.email,
        loggingIn: false,
        verified: action.verified ? true : false,
        hydratedBooks: false,
        hydratedMovies: false,
        hydratedTelevision: false
      });
    case LOGOUT:
      return Object.assign({}, state, {
        token: '',
        email: '',
        verified: false,
        loggingIn: false,
        hydratedBooks: false,
        hydratedMovies: false,
        hydratedTelevision: false
      });
    case HYDRATED_ALL:
      return Object.assign({}, state, {
        hydratedBooks: true,
        hydratedMovies: true,
        hydratedTelevision: true
      });
    case HYDRATED_BOOKS:
      return Object.assign({}, state, {
        hydratedBooks: true
      });
    case HYDRATED_MOVIES:
      return Object.assign({}, state, {
        hydratedMovies: true
      });
    case HYDRATED_TELEVISION:
      return Object.assign({}, state, {
        hydratedTelevision: true
      });
    default:
      return state;
  }
};

export default user;
