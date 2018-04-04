import {
  postResource,
  updateResource,
} from './index';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';

const expressURL = 'http://localhost:3030/remembr';
const userURL = `${expressURL}/users/`;

export const login = user => {
  const loginURL = userURL + 'login';

  return new Promise((resolve, reject) => {
    postResource(loginURL, user).then(result => {
      const tokenObject = {
        token: result,
        email: user.username,
        type: LOGIN
      }

      localStorage.setItem('token', result);
      resolve(tokenObject);
    }).catch(err => {
      reject(err);
    })
  })
};

export const loginToken = token => {
  const verifyURL = userURL + 'verify';
  const tokenObject = {
    token
  }

  return new Promise((resolve, reject) => {
    postResource(verifyURL, tokenObject).then(result => {
      const userObject = {
        token,
        email: result,
        type: LOGIN
      }
      resolve(userObject);
    }).catch(err => {
      reject(err);
    })
  });
}

export const logout = () => {
  localStorage.clear();
  return {
    type: LOGOUT
  };
};

export const register = user => {
  const registerURL = userURL + 'register';

  return new Promise((resolve, reject) => {
    postResource(registerURL, user).then(result => {
      const tokenObj = {
        token: result,
        email: user.username,
        type: LOGIN
      };
      localStorage.setItem('token', result);
      resolve(tokenObj);
    }).catch(err => {
      reject(err);
    })
  });
};

export const resetPassword = user => {
  const resetURL = userURL + 'reset';

  return new Promise((resolve, reject) => {
    updateResource(resetURL, user).then(result => {
      const tokenObj = {
        token: result,
        email: user.email,
        type: LOGIN
      };
      localStorage.setItem('token', result);
      resolve(tokenObj);
    })
  })
}

export const deleteAccount = user => {
  const deleteURL = userURL + 'delete';

  return new Promise((resolve, reject) => {
    postResource(deleteURL, user).then(result => {
      localStorage.clear();
      const deleteAction = {
        type: LOGOUT
      };
      resolve(deleteAction);
    }).catch(err => {
      reject(err);
    })
  })
}