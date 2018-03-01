const request = require('request');

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';

export const ADD_NEW_BOOK = 'ADD_NEW_BOOK';
export const ADD_EXISTING_BOOKS = 'ADD_EXISTING_BOOKS';
export const DELETE_BOOK = 'DELETE_BOOK';
export const EDIT_BOOK = 'EDIT_BOOK';
export const UPDATE_BOOK = 'UPDATE_BOOK';

const expressURL = 'http://localhost:3030/remembr/';
const userURL = expressURL + 'users/';

const bookURL = expressURL + 'books';
// const movieURL = expressURL + 'movies';
// const televisionURL = expressURL + 'television';

export const login = user => {
  const loginURL = userURL + 'login';

  return new Promise((resolve, reject) => {
    postUser(loginURL, user).then(result => {
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
    postUser(verifyURL, tokenObject).then(result => {
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
    postUser(registerURL, user).then(result => {
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
    postUser(deleteURL, user).then(result => {
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

export const addBook = book => {
  return new Promise((resolve, reject) => {
    const bookJSON = {
      title: book.title,
      author: book.author,
      date_read: new Date(book.dateRead).valueOf(),
      username: book.email,
      rating: book.rating
    };
    postResource(bookURL, bookJSON).then(id => {
      bookJSON.id = id;
      bookJSON.type = ADD_NEW_BOOK;
      resolve(bookJSON);
    }).catch(err => {
      reject(err);
    })
  });
};

export const getBooks = () => {
  return getResource(bookURL);
}

export const getUserBooks = token => {
  return getResource(`${bookURL}/${token}`);
}

export const hydrateBooks = books => {
  return {
    type: ADD_EXISTING_BOOKS,
    books
  };
}

export const updateBook = book => {
  return new Promise((resolve, reject) => {
    updateResource(bookURL, book).then(result => {
      resolve({
        ...book,
        type: UPDATE_BOOK
      });
    }).catch(err => {
      reject(err);
    })
  })
}

export const deleteBook = id => {
  return new Promise((resolve, reject) => {
    deleteResource(id, bookURL).then(result => {
      const deleteObj = {
        type: DELETE_BOOK,
        id
      }
      resolve(deleteObj);
    }).catch(err => {
      reject(err);
    })
  })
}

export const editBook = id => {
  return {
    type: EDIT_BOOK,
    id
  }
}

function deleteResource(id, resourceURL) {
  return new Promise((resolve, reject) => {
    request({
      url: resourceURL + '/' + id,
      method: "DELETE",
    }, (error, response) => {
      if (error) {
        reject(error);
      }
      resolve(response);
    })
  })
}

function getResource(resourceURL) {
  return new Promise((resolve, reject) => {
    request({
      url: resourceURL,
      method: "GET"
    }, (error, response) => {
      if (error) {
        reject(error);
      }
      resolve(response);
    })
  })
}

function postResource(resourceURL, jsonObj) {
  return new Promise((resolve, reject) => {
    request({
      url: resourceURL,
      method: "POST",
      json: true,
      body: jsonObj
    }, (error, response, body) => {
      if (error) {
        reject(error);
      }
      resolve(body.insertId);
    });
  });
}

function postUser(resourceURL, jsonObj) {
  return new Promise((resolve, reject) => {
    request({
      url: resourceURL,
      method: "POST",
      json: true,
      body: jsonObj
    }, (error, response, body) => {
      if (error) {
        reject(error);
      } else if (response.statusCode === 400) {
        reject(body);
      }
      resolve(body);
    });
  });
}

function updateResource(resourceURL, jsonObj) {
  return new Promise((resolve, reject) => {
    request({
      url: resourceURL,
      method: "PUT",
      json: true,
      body: jsonObj
    }, (error, response, body) => {
      if (error) {
        reject(error);
      } else if (response.statusCode === 400) {
        reject(body);
      }
      resolve(body);
    });
  });
}