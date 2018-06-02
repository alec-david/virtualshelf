import { getResource, postResource, updateResource, deleteResource } from './index';

export const ADD_NEW_BOOK = 'ADD_NEW_BOOK';
export const ADD_EXISTING_BOOKS = 'ADD_EXISTING_BOOKS';
export const LOAD_MORE_BOOKS = 'LOAD_MORE_BOOKS';
export const DELETE_BOOK = 'DELETE_BOOK';
export const EDIT_BOOK = 'EDIT_BOOK';
export const UPDATE_BOOK = 'UPDATE_BOOK';
export const FILTER_BOOK = 'FILTER_BOOK';
export const SEARCH_BOOK = 'SEARCH_BOOK';

const expressURL = 'http://localhost:3030/remembr';
const bookURL = `${expressURL}/books`;

export const addBook = book => {
  let date_read = new Date(book.date);
  date_read.setTime(date_read.getTime() + date_read.getTimezoneOffset() * 60 * 1000);
  return new Promise((resolve, reject) => {
    const bookJSON = {
      title: book.title,
      author: book.author,
      date: date_read.valueOf(),
      username: book.email,
      rating: book.rating,
      description: book.description
    };
    postResource(bookURL, bookJSON)
      .then(result => {
        bookJSON.id = result.insertId;
        bookJSON.image_url = result.image_url;
        bookJSON.type = ADD_NEW_BOOK;
        resolve(bookJSON);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const getBooks = () => {
  return getResource(bookURL);
};

export const getUserBooks = token => {
  return getResource(`${bookURL}/${token}`);
};

export const hydrateBooks = books => {
  return {
    type: ADD_EXISTING_BOOKS,
    books
  };
};

export const loadMoreBooks = () => {
  return {
    type: LOAD_MORE_BOOKS
  };
};

export const updateBook = book => {
  let date_read = new Date(book.date);
  date_read.setTime(date_read.getTime() + date_read.getTimezoneOffset() * 60 * 1000);
  book.date = date_read.valueOf();
  return new Promise((resolve, reject) => {
    updateResource(bookURL, book)
      .then(result => {
        resolve({
          ...book,
          image_url: result.image_url,
          type: UPDATE_BOOK
        });
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const deleteBook = id => {
  return new Promise((resolve, reject) => {
    deleteResource(id, bookURL)
      .then(result => {
        const deleteObj = {
          type: DELETE_BOOK,
          id
        };
        resolve(deleteObj);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const editBook = id => {
  return {
    type: EDIT_BOOK,
    id
  };
};

export const hideBook = id => {
  return {
    type: DELETE_BOOK,
    id
  };
};

export const filterBook = filter => {
  return {
    ...filter,
    type: FILTER_BOOK
  };
};

export const searchBook = search => {
  return {
    ...search,
    type: SEARCH_BOOK
  };
};

export const flagBook = id => {
  return new Promise((resolve, reject) => {
    updateResource(bookURL, { id })
      .then(result => {
        resolve({
          type: DELETE_BOOK,
          id
        });
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const removeImage = book => {
  updateResource(`${bookURL}/image`, { id: book.id });
  return {
    ...book,
    image_url: null,
    type: UPDATE_BOOK
  };
};
