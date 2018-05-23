import { getResource, postResource, updateResource, deleteResource } from './index';

export const ADD_NEW_MOVIE = 'ADD_NEW_MOVIE';
export const ADD_EXISTING_MOVIES = 'ADD_EXISTING_MOVIES';
export const DELETE_MOVIE = 'DELETE_MOVIE';
export const EDIT_MOVIE = 'EDIT_MOVIE';
export const UPDATE_MOVIE = 'UPDATE_MOVIE';
export const FILTER_MOVIE = 'FILTER_MOVIE';
export const SEARCH_MOVIE = 'SEARCH_MOVIE';

const expressURL = 'http://localhost:3030/remembr';
const movieURL = `${expressURL}/movies`;

export const addMovie = movie => {
  let date_watched = new Date(movie.date);
  date_watched.setTime(date_watched.getTime() + date_watched.getTimezoneOffset() * 60 * 1000);
  return new Promise((resolve, reject) => {
    const movieJSON = {
      title: movie.title,
      director: movie.director,
      date: date_watched.valueOf(),
      username: movie.email,
      rating: movie.rating,
      description: movie.description
    };
    postResource(movieURL, movieJSON)
      .then(result => {
        movieJSON.id = result.insertId;
        movieJSON.image_url = result.image_url;
        movieJSON.type = ADD_NEW_MOVIE;
        resolve(movieJSON);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const getMovies = () => {
  return getResource(movieURL);
};

export const getUserMovies = token => {
  return getResource(`${movieURL}/${token}`);
};

export const hydrateMovies = movies => {
  return {
    type: ADD_EXISTING_MOVIES,
    movies
  };
};

export const updateMovie = movie => {
  let date_watched = new Date(movie.date);
  date_watched.setTime(date_watched.getTime() + date_watched.getTimezoneOffset() * 60 * 1000);
  movie.date = date_watched.valueOf();
  return new Promise((resolve, reject) => {
    updateResource(movieURL, movie)
      .then(result => {
        resolve({
          ...movie,
          image_url: result.image_url,
          type: UPDATE_MOVIE
        });
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const deleteMovie = id => {
  return new Promise((resolve, reject) => {
    deleteResource(id, movieURL)
      .then(result => {
        const deleteObj = {
          id,
          type: DELETE_MOVIE
        };
        resolve(deleteObj);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const editMovie = id => {
  return {
    id,
    type: EDIT_MOVIE
  };
};

export const hideMovie = id => {
  return {
    id,
    type: DELETE_MOVIE
  };
};

export const filterMovie = filter => {
  return {
    ...filter,
    type: FILTER_MOVIE
  };
};

export const searchMovie = search => {
  return {
    ...search,
    type: SEARCH_MOVIE
  };
};

export const flagMovie = id => {
  return new Promise((resolve, reject) => {
    updateResource(movieURL, { id })
      .then(result => {
        resolve({
          id,
          type: DELETE_MOVIE
        });
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const removeImage = movie => {
  updateResource(`${movieURL}/image`, { id: movie.id });
  return {
    ...movie,
    image_url: null,
    type: UPDATE_MOVIE
  };
};
