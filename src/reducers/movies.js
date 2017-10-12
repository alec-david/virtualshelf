import { List } from 'immutable';

const movies = (state = List(), action) => {
  switch (action.type) {
    case 'ADD_MOVIE':
      return state.push({
        id: action.id,
        title: action.title,
        director: action.director,
        rating: action.rating,
        date: action.date
      });
    case 'DELETE_MOVIE':
      return state.filter(movie => movie.id !== action.id);
    default:
      return state;
  }
};

export default movies;
