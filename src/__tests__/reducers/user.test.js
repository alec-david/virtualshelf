import userReducer from '../../reducers/user';
import * as actions from '../../actions/user';

const defaultState = {
  token: '',
  email: '',
  loggingIn: true,
  hydratedBooks: false,
  hydratedMovies: false,
  hydratedTelevision: false,
  verified: false
};

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(userReducer(undefined, {})).toEqual(defaultState);
  });

  it('should login and set token email and verified', () => {
    const initialState = userReducer(undefined, {});

    const token = 'abc';
    const email = 'a@example.com';
    const verified = 1;
    const loginState = userReducer(initialState, { type: actions.LOGIN, token, email, verified });

    expect(loginState.token).toBe(token);
    expect(loginState.email).toBe(email);
    expect(loginState.verified).toBeTruthy();
    expect(
      loginState.loggingIn ||
        loginState.hydratedBooks ||
        loginState.hydratedMovies ||
        loginState.hydratedTelevision
    ).toBeFalsy();
  });

  it('should logout and set state to defaultState', () => {
    const initialState = userReducer(undefined, {});

    const token = 'abc';
    const email = 'a@example.com';
    const verified = 1;
    const loginState = userReducer(initialState, { type: actions.LOGIN, token, email, verified });

    const logoutState = userReducer(loginState, { type: actions.LOGOUT });

    expect(
      logoutState.token ||
        logoutState.email ||
        logoutState.loggingIn ||
        logoutState.hydratedBooks ||
        logoutState.hydratedMovies ||
        logoutState.hydratedTelevision ||
        logoutState.verified
    ).toBeFalsy();
  });

  it('should set verified flag to true', () => {
    const initialState = userReducer(undefined, {});
    const verifiedState = userReducer(initialState, { type: actions.SET_VERIFIED });
    expect(verifiedState.verified).toBeTruthy();
  });

  it('should set hydratedBooks flag to true', () => {
    const initialState = userReducer(undefined, {});
    const verifiedState = userReducer(initialState, { type: actions.HYDRATED_BOOKS });
    expect(verifiedState.hydratedBooks).toBeTruthy();
  });

  it('should set hydratedMovies flag to true', () => {
    const initialState = userReducer(undefined, {});
    const verifiedState = userReducer(initialState, { type: actions.HYDRATED_MOVIES });
    expect(verifiedState.hydratedMovies).toBeTruthy();
  });

  it('should set hydratedTelevision flag to true', () => {
    const initialState = userReducer(undefined, {});
    const verifiedState = userReducer(initialState, { type: actions.HYDRATED_TELEVISION });
    expect(verifiedState.hydratedTelevision).toBeTruthy();
  });

  it('should set all hydrated flags to true', () => {
    const initialState = userReducer(undefined, {});
    const verifiedState = userReducer(initialState, { type: actions.HYDRATED_ALL });
    expect(verifiedState.hydratedBooks).toBeTruthy();
    expect(verifiedState.hydratedMovies).toBeTruthy();
    expect(verifiedState.hydratedTelevision).toBeTruthy();
  });

  it('should not match any action and return current state', () => {
    const initialState = userReducer(undefined, { type: 'bleh' });

    expect(initialState).toMatchObject(defaultState);
  });
});
