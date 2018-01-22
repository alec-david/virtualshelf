import auth0 from 'auth0-js';
import { login } from '../actions/index';

export default class Auth {

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  auth0 = new auth0.WebAuth({
    domain: 'remembr.auth0.com',
    clientID: 'jb9yzphrDDmYPTyV8FdRpuGYB_A7ch1H',
    redirectUri: 'http://localhost:3000/callback',
    audience: 'https://remembr.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid profile'
  });

  handleAuthentication(dispatch) {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        const userInfo = this.setSession(authResult);
        dispatch(login(userInfo));
      } else if (err) {
        console.log(err);
      }
    })
  }

  setSession(authResult) {
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    const userInfo = {
      access_token: authResult.accessToken,
      id_token: authResult.idToken,
      expires_at: expiresAt
    };
    localStorage.setItem('access_token', userInfo.access_token);
    localStorage.setItem('id_token', userInfo.id_token);
    localStorage.setItem('expires_at', userInfo.expires_at);
    return userInfo;
  }

  login() {
    this.auth0.authorize();
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    //history.replace('/home');
  }

  isAuthenticated() {
    // Check whether the current time is past the 
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  checkValidUser(expiresAt) {
    if (!expiresAt) {
      return false;
    }
    return new Date().getTime() < expiresAt;
  }

  userProfile;

  getAccessToken() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    return accessToken;
  }

  getProfile(cb) {
    let accessToken = this.getAccessToken();
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
      }
      cb(err, profile);
    });
  }
}