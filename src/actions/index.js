const request = require('request');

export const ADD_NEW_BOOK = 'ADD_NEW_BOOK';
export const ADD_EXISTING_BOOKS = 'ADD_EXISTING_BOOKS';
export const DELETE_BOOK = 'DELETE_BOOK';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';

const expressURL = 'http://localhost:3030/remembr/';
const userURL = expressURL + 'users';
const registerURL = expressURL + 'users/register';
const loginURL = expressURL + 'users/login';
const bookURL = expressURL + 'books';
// const movieURL = expressURL + 'movies';
// const televisionURL = expressURL + 'television';

export const login = (user) => {
  return new Promise((resolve, reject) => {
    postUser(loginURL, user).then(result => {
      const tokenObject = {
        token: result,
        type: LOGIN
      }
      if (!localStorage.getItem('token')) {
        localStorage.setItem('token', result);
      }
      resolve(tokenObject);
    }).catch(err => {
      reject(err);
    })
  })
};

export const loginToken = (token) => {
  return {
    token,
    type: LOGIN
  }
}

export const logout = () => {
  return {
    type: LOGOUT
  };
};

export const register = user => {
  return new Promise((resolve, reject) => {
    postUser(registerURL, user).then(result => {
      const tokenObj = {
        token: result,
        type: LOGIN
      };
      localStorage.setItem('token', result);
      resolve(tokenObj);
    }).catch(err => {
      reject(err);
    })
  });
};

export const addBook = book => {
  return new Promise((resolve, reject) => {
    const bookJSON = {
      title: book.title,
      author: book.author,
      date: new Date(book.date).valueOf(),
      userId: 0,
      rating: parseInt(book.rating, 10)
    };
    let asyncPost = postResource(bookURL, bookJSON);
    asyncPost.then(id => {
      bookJSON.id = id;
      bookJSON.type = ADD_NEW_BOOK;
      resolve(bookJSON);
    });
  });
};

export const getBooks = () => {
  return new Promise((resolve, reject) => {
    request
      .get(bookURL)
      .on('response', response => {
        //console.log(response.statusCode)
        //TODO: Handle Error
      })
      .on('data', data => {
        resolve(data.toString('utf-8'));
      })
  });
}

export const hydrateBooks = books => {
  return {
    type: ADD_EXISTING_BOOKS,
    books
  };
}

export const deleteBook = id => {
  deleteResource(id, bookURL);
  return {
    type: DELETE_BOOK,
    id
  }
}

function deleteResource(id, resourceURL) {
  request({
    url: resourceURL + '/' + id,
    method: "DELETE",
  }, (error, response) => {
    console.log(response);
  })
}

function getResource(resourceURL) {
  request
    .get(resourceURL)
    .on('response', response => {
      console.log(response.statusCode)
    })
    .on('data', data => {
      console.log(data.toString('utf-8'));
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
      resolve(response.body.id);
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