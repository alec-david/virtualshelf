import moviesReducer from '../../reducers/movies';
import * as actions from '../../actions/movie';
import * as userActions from '../../actions/user';

import { List } from 'immutable';
const DESC = 'DESC';

const defaultState = {
  list: List(),
  movieCount: 0,
  option: 'date',
  optionText: 'Date Watched',
  filterDirection: DESC,
  search: '',
  loadedMovies: 50
};

describe('movies reducer', () => {
  it('should return the initial state', () => {
    expect(moviesReducer(undefined, {})).toEqual(defaultState);
  });

  it('should add new movie when passed ADD_NEW_MOVIE', () => {
    const exampleMovie = {
      title: 'Test Title',
      director: 'Test Director',
      description: '',
      date: new Date().getTime(),
      rating: 3
    };

    const updatedState = moviesReducer(undefined, {
      type: actions.ADD_NEW_MOVIE,
      movie: exampleMovie
    });
    expect(updatedState.movieCount).toEqual(1);
    expect(updatedState.list.size).toEqual(1);
    expect(updatedState.list.get(0).movie).toEqual(exampleMovie);
  });

  it('should add existing movies returned from database', () => {
    const movieArr = `[
      ${JSON.stringify(generateMovie('A', 'A', 3, new Date().getTime(), 0))},
      ${JSON.stringify(generateMovie('B', 'B', 4, new Date().getTime(), 1))},
      ${JSON.stringify(generateMovie('C', 'C', 5, new Date().getTime(), 2))}
    ]`;

    const updatedState = moviesReducer(undefined, {
      type: actions.ADD_EXISTING_MOVIES,
      movies: movieArr
    });

    expect(updatedState.movieCount).toBe(3);
    expect(updatedState.list.size).toBe(3);

    let titleExists = true;
    for (let i = 0; i < updatedState.list.size; i++) {
      titleExists = 'ABC'.includes(updatedState.list.get(i).title);
    }
    expect(titleExists).toBeTruthy();
  });

  it('should load more movies by increasing loadedMovies value', () => {
    const initialMoviesLoaded = moviesReducer(undefined, {}).loadedMovies;
    const moreMoviesLoaded = moviesReducer(undefined, { type: actions.LOAD_MORE_MOVIES })
      .loadedMovies;
    expect(moreMoviesLoaded).toBeGreaterThan(initialMoviesLoaded);
  });

  it('should delete a movie, given list of movies and valid id', () => {
    const movieArr = `[
      ${JSON.stringify(generateMovie('A', 'A', 3, new Date().getTime(), 0))},
      ${JSON.stringify(generateMovie('B', 'B', 4, new Date().getTime(), 1))},
      ${JSON.stringify(generateMovie('C', 'C', 5, new Date().getTime(), 2))}
    ]`;

    const updatedState = moviesReducer(undefined, {
      type: actions.ADD_EXISTING_MOVIES,
      movies: movieArr
    });

    const stateAfterDeletion = moviesReducer(updatedState, { type: actions.DELETE_MOVIE, id: 2 });
    expect(stateAfterDeletion.movieCount).toBe(2);
    expect(stateAfterDeletion.list.size).toBe(2);
    expect(stateAfterDeletion.list.get(0).title).toBe('A');
    expect(stateAfterDeletion.list.get(1).title).toBe('B');
  });

  it('should not delete a movie, given list of movies and invalid id', () => {
    const movieArr = `[
      ${JSON.stringify(generateMovie('A', 'A', 3, new Date().getTime(), 0))},
      ${JSON.stringify(generateMovie('B', 'B', 4, new Date().getTime(), 1))},
      ${JSON.stringify(generateMovie('C', 'C', 5, new Date().getTime(), 2))}
    ]`;

    const updatedState = moviesReducer(undefined, {
      type: actions.ADD_EXISTING_MOVIES,
      movies: movieArr
    });

    const stateAfterDeletion = moviesReducer(updatedState, { type: actions.DELETE_MOVIE, id: -1 });
    expect(stateAfterDeletion.movieCount).toBe(3);
    expect(stateAfterDeletion.list.size).toBe(3);
  });

  it('should update movie status to edit given valid id', () => {
    const initialState = moviesReducer(undefined, {});
    const stateAterAddingMovie = moviesReducer(initialState, {
      type: actions.ADD_NEW_MOVIE,
      ...generateMovie('A', 'A', 3, new Date().getTime(), 0)
    });

    const stateAfterEditMovie = moviesReducer(stateAterAddingMovie, {
      type: actions.EDIT_MOVIE,
      id: 0
    });
    expect(stateAfterEditMovie.list.get(0).edit).toBeTruthy();
  });

  it('should not update movie status to edit given invalid id', () => {
    const initialState = moviesReducer(undefined, {});
    const stateAterAddingMovie = moviesReducer(initialState, {
      type: actions.ADD_NEW_Movie,
      ...generateMovie('A', 'A', 3, new Date().getTime(), 0)
    });

    const stateAfterEditMovie = moviesReducer(stateAterAddingMovie, {
      type: actions.EDIT_MOVIE,
      id: 1
    });
    expect(stateAfterEditMovie.list.get(0).edit).toBeTruthy();
  });

  it('should update movie, given valid movie id and updated details', () => {
    const initialState = moviesReducer(undefined, {});
    const stateAterAddingMovie = moviesReducer(initialState, {
      type: actions.ADD_NEW_MOVIE,
      ...generateMovie('A', 'A', 3, new Date().getTime(), 0)
    });

    expect(stateAterAddingMovie.list.get(0).title).toBe('A');
    expect(stateAterAddingMovie.list.get(0).director).toBe('A');
    expect(stateAterAddingMovie.list.get(0).rating).toBe(3);

    const stateAfterUpdateMovie = moviesReducer(stateAterAddingMovie, {
      type: actions.UPDATE_MOVIE,
      id: 0,
      title: 'B',
      director: 'B',
      rating: 5
    });
    expect(stateAfterUpdateMovie.list.get(0).title).toBe('B');
    expect(stateAfterUpdateMovie.list.get(0).director).toBe('B');
    expect(stateAfterUpdateMovie.list.get(0).rating).toBe(5);
  });

  it('should filter movie list by descending date (newest -> oldest)', () => {
    const initialState = moviesReducer(undefined, {});

    const currentDate = new Date();
    const movieArr = `[
      ${JSON.stringify(generateMovie('A', 'A', 3, currentDate.getTime(), 0))},
      ${JSON.stringify(generateMovie('B', 'B', 4, addDays(currentDate, 1).getTime(), 1))},
      ${JSON.stringify(generateMovie('C', 'C', 5, addDays(currentDate, 2).getTime(), 2))}
    ]`;

    const updatedState = moviesReducer(initialState, {
      type: actions.ADD_EXISTING_MOVIES,
      movies: movieArr
    });

    const filteredState = moviesReducer(updatedState, {
      type: actions.FILTER_MOVIE,
      option: 'date',
      optionText: 'Date',
      filterDirection: DESC,
      search: ''
    });

    expect(filteredState.list.get(0).title).toBe('C');
    expect(filteredState.list.get(1).title).toBe('B');
    expect(filteredState.list.get(2).title).toBe('A');
  });

  it('should filter movie list by ascending date (oldest -> newest)', () => {
    const initialState = moviesReducer(undefined, {});

    const currentDate = new Date();
    const movieArr = `[
      ${JSON.stringify(generateMovie('A', 'A', 3, currentDate.getTime(), 0))},
      ${JSON.stringify(generateMovie('B', 'B', 4, addDays(currentDate, 1).getTime(), 1))},
      ${JSON.stringify(generateMovie('C', 'C', 5, addDays(currentDate, 2).getTime(), 2))}
    ]`;

    const updatedState = moviesReducer(initialState, {
      type: actions.ADD_EXISTING_MOVIES,
      movies: movieArr
    });

    const filteredState = moviesReducer(updatedState, {
      type: actions.FILTER_MOVIE,
      option: 'date',
      optionText: 'Date',
      filterDirection: '',
      search: ''
    });

    expect(filteredState.list.get(0).title).toBe('A');
    expect(filteredState.list.get(1).title).toBe('B');
    expect(filteredState.list.get(2).title).toBe('C');
  });

  it('should filter movie list by descending title (A -> Z)', () => {
    const initialState = moviesReducer(undefined, {});

    const currentDate = new Date();
    const movieArr = `[
      ${JSON.stringify(generateMovie('A', 'A', 3, currentDate.getTime(), 0))},
      ${JSON.stringify(generateMovie('B', 'B', 4, addDays(currentDate, 1).getTime(), 1))},
      ${JSON.stringify(generateMovie('C', 'C', 5, addDays(currentDate, 2).getTime(), 2))}
    ]`;

    const updatedState = moviesReducer(initialState, {
      type: actions.ADD_EXISTING_MOVIES,
      movies: movieArr
    });

    const filteredState = moviesReducer(updatedState, {
      type: actions.FILTER_MOVIE,
      option: 'title',
      optionText: 'Title',
      filterDirection: DESC,
      search: ''
    });

    expect(filteredState.list.get(0).title).toBe('A');
    expect(filteredState.list.get(1).title).toBe('B');
    expect(filteredState.list.get(2).title).toBe('C');
  });

  it('should filter movie list by ascending title (Z -> A)', () => {
    const initialState = moviesReducer(undefined, {});

    const currentDate = new Date();
    const movieArr = `[
      ${JSON.stringify(generateMovie('A', 'A', 3, currentDate.getTime(), 0))},
      ${JSON.stringify(generateMovie('B', 'B', 4, addDays(currentDate, 1).getTime(), 1))},
      ${JSON.stringify(generateMovie('C', 'C', 5, addDays(currentDate, 2).getTime(), 2))}
    ]`;

    const updatedState = moviesReducer(initialState, {
      type: actions.ADD_EXISTING_MOVIES,
      movies: movieArr
    });

    const filteredState = moviesReducer(updatedState, {
      type: actions.FILTER_MOVIE,
      option: 'title',
      optionText: 'Title',
      filterDirection: '',
      search: ''
    });

    expect(filteredState.list.get(0).title).toBe('C');
    expect(filteredState.list.get(1).title).toBe('B');
    expect(filteredState.list.get(2).title).toBe('A');
  });

  it('should filter movie list by descending rating (5 -> 1)', () => {
    const initialState = moviesReducer(undefined, {});

    const currentDate = new Date();
    const movieArr = `[
      ${JSON.stringify(generateMovie('A', 'A', 3, currentDate.getTime(), 0))},
      ${JSON.stringify(generateMovie('B', 'B', 4, addDays(currentDate, 1).getTime(), 1))},
      ${JSON.stringify(generateMovie('C', 'C', 5, addDays(currentDate, 2).getTime(), 2))}
    ]`;

    const updatedState = moviesReducer(initialState, {
      type: actions.ADD_EXISTING_MOVIES,
      movies: movieArr
    });

    const filteredState = moviesReducer(updatedState, {
      type: actions.FILTER_MOVIE,
      option: 'rating',
      optionText: 'Rating',
      filterDirection: DESC,
      search: ''
    });

    expect(filteredState.list.get(0).title).toBe('C');
    expect(filteredState.list.get(1).title).toBe('B');
    expect(filteredState.list.get(2).title).toBe('A');
  });

  it('should filter movie list by ascending rating (1 -> 5)', () => {
    const initialState = moviesReducer(undefined, {});

    const currentDate = new Date();
    const movieArr = `[
      ${JSON.stringify(generateMovie('A', 'A', 3, currentDate.getTime(), 0))},
      ${JSON.stringify(generateMovie('B', 'B', 4, addDays(currentDate, 1).getTime(), 1))},
      ${JSON.stringify(generateMovie('C', 'C', 5, addDays(currentDate, 2).getTime(), 2))}
    ]`;

    const updatedState = moviesReducer(initialState, {
      type: actions.ADD_EXISTING_MOVIES,
      movies: movieArr
    });

    const filteredState = moviesReducer(updatedState, {
      type: actions.FILTER_MOVIE,
      option: 'rating',
      optionText: 'Rating',
      filterDirection: '',
      search: ''
    });

    expect(filteredState.list.get(0).title).toBe('A');
    expect(filteredState.list.get(1).title).toBe('B');
    expect(filteredState.list.get(2).title).toBe('C');
  });

  it('should search movie list and match title', () => {
    const initialState = moviesReducer(undefined, {});

    const currentDate = new Date();
    const movieArr = `[
      ${JSON.stringify(generateMovie('Test', 'Writer', 3, currentDate.getTime(), 0))},
      ${JSON.stringify(generateMovie('B', 'Director', 4, addDays(currentDate, 1).getTime(), 1))},
      ${JSON.stringify(generateMovie('C', 'Director', 5, addDays(currentDate, 2).getTime(), 2))}
    ]`;

    const updatedState = moviesReducer(initialState, {
      type: actions.ADD_EXISTING_MOVIES,
      movies: movieArr
    });

    const searchedState = moviesReducer(updatedState, {
      type: actions.SEARCH_MOVIE,
      option: 'date',
      optionText: 'Date',
      filterDirection: DESC,
      search: 'Test'
    });

    expect(searchedState.movieCount).toBe(3);
    expect(searchedState.list.size).toBe(1);
    expect(searchedState.list.get(0).title).toBe('Test');
  });

  it('should search movie list and match director', () => {
    const initialState = moviesReducer(undefined, {});

    const currentDate = new Date();
    const movieArr = `[
      ${JSON.stringify(generateMovie('Test', 'Writer', 3, currentDate.getTime(), 0))},
      ${JSON.stringify(generateMovie('B', 'Director', 4, addDays(currentDate, 1).getTime(), 1))},
      ${JSON.stringify(generateMovie('C', 'Director', 5, addDays(currentDate, 2).getTime(), 2))}
    ]`;

    const updatedState = moviesReducer(initialState, {
      type: actions.ADD_EXISTING_MOVIES,
      movies: movieArr
    });

    const searchedState = moviesReducer(updatedState, {
      type: actions.SEARCH_MOVIE,
      search: 'Director'
    });

    expect(searchedState.movieCount).toBe(3);
    expect(searchedState.list.size).toBe(2);
    expect(searchedState.list.get(0).title).toBe('C');
    expect(searchedState.list.get(1).title).toBe('B');
    expect(searchedState.list.get(0).director).toBe('Director');
  });

  it('should search movie list and find no match', () => {
    const initialState = moviesReducer(undefined, {});

    const currentDate = new Date();
    const movieArr = `[
      ${JSON.stringify(generateMovie('Test', 'Z', 3, currentDate.getTime(), 0))},
      ${JSON.stringify(generateMovie('B', 'Director', 4, addDays(currentDate, 1).getTime(), 1))},
      ${JSON.stringify(generateMovie('C', 'Director', 5, addDays(currentDate, 2).getTime(), 2))}
    ]`;

    const updatedState = moviesReducer(initialState, {
      type: actions.ADD_EXISTING_MOVIES,
      movies: movieArr
    });

    const searchedState = moviesReducer(updatedState, {
      type: actions.SEARCH_MOVIE,
      search: 'xyz'
    });

    expect(searchedState.movieCount).toBe(3);
    expect(searchedState.list.size).toBe(0);
  });

  it('should login and return initial state', () => {
    const initialState = moviesReducer(undefined, { type: userActions.LOGIN });
    expect(initialState).toMatchObject(defaultState);
  });

  it('should logout and return initial state', () => {
    const initialState = moviesReducer(undefined, { type: userActions.LOGOUT });
    expect(initialState).toMatchObject(defaultState);
  });

  it('should not match any action and return current state', () => {
    const initialState = moviesReducer(undefined, { type: 'bleh' });
    expect(initialState).toMatchObject(defaultState);
  });
});

const generateMovie = (title, director, rating, date, id) => {
  return {
    title,
    director,
    rating,
    id,
    date,
    edit: false
  };
};

const addDays = (date, days) => {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};
