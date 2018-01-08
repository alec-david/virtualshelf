const request = require('request');

export const REQUEST_BOOKS = 'REQUEST_BOOKS';
export const RECEIVE_BOOKS = 'RECEIVE_BOOKS';

const mySQLURL = "http://localhost:8080/remembr/";
const userURL = mySQLURL + "users";
const bookURL = mySQLURL + "books";
const movieURL = mySQLURL + "movies";
const televisionURL = mySQLURL + "television";


let nextBookId = 0;
export const addBook = book => {
  const bookJSON = {
    id: nextBookId++,
    title: book.title,
    author: book.author,
    date: new Date(book.date).valueOf(),
    userId: 0,
    rating: 10
  };
  postResource(bookURL, bookJSON);

  bookJSON.type = 'ADD_NEW_BOOK';
  return bookJSON;
};

export const getBooks = () => {
  return new Promise((resolve, reject) => {
    request
      .get(bookURL)
      .on('response', response => {
        console.log(response.statusCode)
      })
      .on('data', data => {
        resolve(data.toString('utf-8'));
      })
  });
}

export const hydrateBooks = books => {
  return {
    type: 'ADD_EXISTING_BOOKS',
    books
  };
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
  request({
    url: resourceURL,
    method: "POST",
    json: true,
    body: jsonObj
  }, (error, response, body) => {
    console.log(response);
  });
}

/*function requestBooks(user) {
  return {
    type: 'REQUEST_POSTS',
    user
  }
}

function receiveBooks(user, json) {
  return {
    type: 'RECEIVE_POSTS',
    user,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

function shouldFetchBooks(state, subreddit) {
  const book = state.postsBySubreddit[subreddit]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export function fetchBooksIfNeeded(books) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), books)) {
      return dispatch(fetchPosts(books))
    }
  }
}*/