import {
  getResource,
  postResource,
  updateResource,
  deleteResourceWithBody,
  expressURL
} from './index';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';
export const SET_VERIFIED = 'SET_VERIFIED';
export const HYDRATED_ALL = 'HYDRATED_ALL';
export const HYDRATED_BOOKS = 'HYDRATED_BOOKS';
export const HYDRATED_MOVIES = 'HYDRATED_MOVIES';
export const HYDRATED_TELEVISION = 'HYDRATED_TELEVISION';

const userURL = `${expressURL}/users/`;

export const login = user => {
  const loginURL = userURL + 'login';

  return new Promise((resolve, reject) => {
    postResource(loginURL, user)
      .then(result => {
        result.type = LOGIN;
        localStorage.setItem('token', result.token);
        resolve(result);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const loginToken = token => {
  const verifyURL = userURL + 'verify';

  return new Promise((resolve, reject) => {
    postResource(verifyURL, { token })
      .then(result => {
        result.type = LOGIN;
        resolve(result);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const logout = () => {
  localStorage.clear();
  return {
    type: LOGOUT
  };
};

export const register = user => {
  const registerURL = userURL + 'register';

  return new Promise((resolve, reject) => {
    postResource(registerURL, user)
      .then(result => {
        const tokenObj = {
          token: result,
          email: user.username,
          type: LOGIN
        };
        localStorage.setItem('token', result);
        resolve(tokenObj);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const resetPassword = user => {
  const resetURL = userURL + 'reset';

  return new Promise((resolve, reject) => {
    updateResource(resetURL, user)
      .then(result => {
        const tokenObj = {
          token: result.token,
          email: result.email,
          type: LOGIN
        };
        localStorage.setItem('token', result.token);
        resolve(tokenObj);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const resetPasswordEmail = email => {
  const resetURL = `${userURL}reset?email=${email}`;
  return getResource(resetURL);
};

export const deleteAccount = user => {
  const deleteURL = userURL + 'delete';

  return new Promise((resolve, reject) => {
    deleteResourceWithBody(deleteURL, user)
      .then(result => {
        localStorage.clear();
        const deleteAction = {
          type: LOGOUT
        };
        resolve(deleteAction);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const verifyEmailWithToken = token => {
  const verifyURL = userURL + 'verifyEmail';

  return new Promise((resolve, reject) => {
    postResource(verifyURL, { token })
      .then(result => {
        resolve({ type: SET_VERIFIED });
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const resendVerifyEmail = token => {
  const verifyURL = `${userURL}verifyEmail?token=${token}`;
  return getResource(verifyURL);
};

export const setHydratedAllFlag = () => {
  return {
    type: HYDRATED_ALL
  };
};

export const setHydratedBooksFlag = () => {
  return {
    type: HYDRATED_BOOKS
  };
};

export const setHydratedMoviesFlag = () => {
  return {
    type: HYDRATED_MOVIES
  };
};

export const setHydratedTelevisionFlag = () => {
  return {
    type: HYDRATED_TELEVISION
  };
};
