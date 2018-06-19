import booksReducer from '../../reducers/books';
import * as actions from '../../actions/book';
import * as userActions from '../../actions/user';

import { List } from 'immutable';
const DESC = 'DESC';

const defaultState = {
  list: List(),
  bookCount: 0,
  option: 'date',
  optionText: 'Date Read',
  filterDirection: DESC,
  search: '',
  loadedBooks: 50
};

describe('books reducer', () => {
  it('should return the initial state', () => {
    expect(booksReducer(undefined, {})).toEqual(defaultState);
  });

  it('should add new book when passed ADD_NEW_BOOK', () => {
    const exampleBook = {
      title: 'Test Title',
      author: 'Test Author',
      description: '',
      date: new Date().getTime(),
      rating: 3
    };

    const updatedState = booksReducer(undefined, { type: actions.ADD_NEW_BOOK, book: exampleBook });
    expect(updatedState.bookCount).toEqual(1);
    expect(updatedState.list.size).toEqual(1);
    expect(updatedState.list.get(0).book).toEqual(exampleBook);
  });

  it('should add existing books returned from database', () => {
    const bookArr = `[
      ${JSON.stringify(generateBook('A', 'A', 3, new Date().getTime(), 0))},
      ${JSON.stringify(generateBook('B', 'B', 4, new Date().getTime(), 1))},
      ${JSON.stringify(generateBook('C', 'C', 5, new Date().getTime(), 2))}
    ]`;

    const updatedState = booksReducer(undefined, {
      type: actions.ADD_EXISTING_BOOKS,
      books: bookArr
    });

    expect(updatedState.bookCount).toBe(3);
    expect(updatedState.list.size).toBe(3);

    let titleExists = true;
    for (let i = 0; i < updatedState.list.size; i++) {
      titleExists = 'ABC'.includes(updatedState.list.get(i).title);
    }
    expect(titleExists).toBeTruthy();
  });

  it('should load more books by increasing loadedBooks value', () => {
    const initialBooksLoaded = booksReducer(undefined, {}).loadedBooks;
    const moreBooksLoaded = booksReducer(undefined, { type: actions.LOAD_MORE_BOOKS }).loadedBooks;
    expect(moreBooksLoaded).toBeGreaterThan(initialBooksLoaded);
  });

  it('should delete a book, given list of books and valid id', () => {
    const bookArr = `[
      ${JSON.stringify(generateBook('A', 'A', 3, new Date().getTime(), 0))},
      ${JSON.stringify(generateBook('B', 'B', 4, new Date().getTime(), 1))},
      ${JSON.stringify(generateBook('C', 'C', 5, new Date().getTime(), 2))}
    ]`;

    const updatedState = booksReducer(undefined, {
      type: actions.ADD_EXISTING_BOOKS,
      books: bookArr
    });

    const stateAfterDeletion = booksReducer(updatedState, { type: actions.DELETE_BOOK, id: 2 });
    expect(stateAfterDeletion.bookCount).toBe(2);
    expect(stateAfterDeletion.list.size).toBe(2);
    expect(stateAfterDeletion.list.get(0).title).toBe('A');
    expect(stateAfterDeletion.list.get(1).title).toBe('B');
  });

  it('should not delete a book, given list of books and invalid id', () => {
    const bookArr = `[
      ${JSON.stringify(generateBook('A', 'A', 3, new Date().getTime(), 0))},
      ${JSON.stringify(generateBook('B', 'B', 4, new Date().getTime(), 1))},
      ${JSON.stringify(generateBook('C', 'C', 5, new Date().getTime(), 2))}
    ]`;

    const updatedState = booksReducer(undefined, {
      type: actions.ADD_EXISTING_BOOKS,
      books: bookArr
    });

    const stateAfterDeletion = booksReducer(updatedState, { type: actions.DELETE_BOOK, id: -1 });
    expect(stateAfterDeletion.bookCount).toBe(3);
    expect(stateAfterDeletion.list.size).toBe(3);
  });

  it('should update book status to edit given valid id', () => {
    const initialState = booksReducer(undefined, {});
    const stateAterAddingBook = booksReducer(initialState, {
      type: actions.ADD_NEW_BOOK,
      ...generateBook('A', 'A', 3, new Date().getTime(), 0)
    });

    const stateAfterEditBook = booksReducer(stateAterAddingBook, {
      type: actions.EDIT_BOOK,
      id: 0
    });
    expect(stateAfterEditBook.list.get(0).edit).toBeTruthy();
  });

  it('should not update book status to edit given invalid id', () => {
    const initialState = booksReducer(undefined, {});
    const stateAterAddingBook = booksReducer(initialState, {
      type: actions.ADD_NEW_BOOK,
      ...generateBook('A', 'A', 3, new Date().getTime(), 0)
    });

    const stateAfterEditBook = booksReducer(stateAterAddingBook, {
      type: actions.EDIT_BOOK,
      id: 1
    });
    expect(stateAfterEditBook.list.get(0).edit).toBeTruthy();
  });

  it('should update book, given valid book id and updated details', () => {
    const initialState = booksReducer(undefined, {});
    const stateAterAddingBook = booksReducer(initialState, {
      type: actions.ADD_NEW_BOOK,
      ...generateBook('A', 'A', 3, new Date().getTime(), 0)
    });

    expect(stateAterAddingBook.list.get(0).title).toBe('A');
    expect(stateAterAddingBook.list.get(0).author).toBe('A');
    expect(stateAterAddingBook.list.get(0).rating).toBe(3);

    const stateAfterUpdateBook = booksReducer(stateAterAddingBook, {
      type: actions.UPDATE_BOOK,
      id: 0,
      title: 'B',
      author: 'B',
      rating: 5
    });
    expect(stateAfterUpdateBook.list.get(0).title).toBe('B');
    expect(stateAfterUpdateBook.list.get(0).author).toBe('B');
    expect(stateAfterUpdateBook.list.get(0).rating).toBe(5);
  });

  it('should filter book list by descending date (newest -> oldest)', () => {
    const initialState = booksReducer(undefined, {});

    const currentDate = new Date();
    const bookArr = `[
      ${JSON.stringify(generateBook('A', 'A', 3, currentDate.getTime(), 0))},
      ${JSON.stringify(generateBook('B', 'B', 4, addDays(currentDate, 1).getTime(), 1))},
      ${JSON.stringify(generateBook('C', 'C', 5, addDays(currentDate, 2).getTime(), 2))}
    ]`;

    const updatedState = booksReducer(initialState, {
      type: actions.ADD_EXISTING_BOOKS,
      books: bookArr
    });

    const filteredState = booksReducer(updatedState, {
      type: actions.FILTER_BOOK,
      option: 'date',
      optionText: 'Date',
      filterDirection: DESC,
      search: ''
    });

    expect(filteredState.list.get(0).title).toBe('C');
    expect(filteredState.list.get(1).title).toBe('B');
    expect(filteredState.list.get(2).title).toBe('A');
  });

  it('should filter book list by ascending date (oldest -> newest)', () => {
    const initialState = booksReducer(undefined, {});

    const currentDate = new Date();
    const bookArr = `[
      ${JSON.stringify(generateBook('A', 'A', 3, currentDate.getTime(), 0))},
      ${JSON.stringify(generateBook('B', 'B', 4, addDays(currentDate, 1).getTime(), 1))},
      ${JSON.stringify(generateBook('C', 'C', 5, addDays(currentDate, 2).getTime(), 2))}
    ]`;

    const updatedState = booksReducer(initialState, {
      type: actions.ADD_EXISTING_BOOKS,
      books: bookArr
    });

    const filteredState = booksReducer(updatedState, {
      type: actions.FILTER_BOOK,
      option: 'date',
      optionText: 'Date',
      filterDirection: '',
      search: ''
    });

    expect(filteredState.list.get(0).title).toBe('A');
    expect(filteredState.list.get(1).title).toBe('B');
    expect(filteredState.list.get(2).title).toBe('C');
  });

  it('should filter book list by descending title (A -> Z)', () => {
    const initialState = booksReducer(undefined, {});

    const currentDate = new Date();
    const bookArr = `[
      ${JSON.stringify(generateBook('A', 'A', 3, currentDate.getTime(), 0))},
      ${JSON.stringify(generateBook('B', 'B', 4, addDays(currentDate, 1).getTime(), 1))},
      ${JSON.stringify(generateBook('C', 'C', 5, addDays(currentDate, 2).getTime(), 2))}
    ]`;

    const updatedState = booksReducer(initialState, {
      type: actions.ADD_EXISTING_BOOKS,
      books: bookArr
    });

    const filteredState = booksReducer(updatedState, {
      type: actions.FILTER_BOOK,
      option: 'title',
      optionText: 'Title',
      filterDirection: DESC,
      search: ''
    });

    expect(filteredState.list.get(0).title).toBe('A');
    expect(filteredState.list.get(1).title).toBe('B');
    expect(filteredState.list.get(2).title).toBe('C');
  });

  it('should filter book list by ascending title (Z -> A)', () => {
    const initialState = booksReducer(undefined, {});

    const currentDate = new Date();
    const bookArr = `[
      ${JSON.stringify(generateBook('A', 'A', 3, currentDate.getTime(), 0))},
      ${JSON.stringify(generateBook('B', 'B', 4, addDays(currentDate, 1).getTime(), 1))},
      ${JSON.stringify(generateBook('C', 'C', 5, addDays(currentDate, 2).getTime(), 2))}
    ]`;

    const updatedState = booksReducer(initialState, {
      type: actions.ADD_EXISTING_BOOKS,
      books: bookArr
    });

    const filteredState = booksReducer(updatedState, {
      type: actions.FILTER_BOOK,
      option: 'title',
      optionText: 'Title',
      filterDirection: '',
      search: ''
    });

    expect(filteredState.list.get(0).title).toBe('C');
    expect(filteredState.list.get(1).title).toBe('B');
    expect(filteredState.list.get(2).title).toBe('A');
  });

  it('should filter book list by descending rating (5 -> 1)', () => {
    const initialState = booksReducer(undefined, {});

    const currentDate = new Date();
    const bookArr = `[
      ${JSON.stringify(generateBook('A', 'A', 3, currentDate.getTime(), 0))},
      ${JSON.stringify(generateBook('B', 'B', 4, addDays(currentDate, 1).getTime(), 1))},
      ${JSON.stringify(generateBook('C', 'C', 5, addDays(currentDate, 2).getTime(), 2))}
    ]`;

    const updatedState = booksReducer(initialState, {
      type: actions.ADD_EXISTING_BOOKS,
      books: bookArr
    });

    const filteredState = booksReducer(updatedState, {
      type: actions.FILTER_BOOK,
      option: 'rating',
      optionText: 'Rating',
      filterDirection: DESC,
      search: ''
    });

    expect(filteredState.list.get(0).title).toBe('C');
    expect(filteredState.list.get(1).title).toBe('B');
    expect(filteredState.list.get(2).title).toBe('A');
  });

  it('should filter book list by ascending rating (1 -> 5)', () => {
    const initialState = booksReducer(undefined, {});

    const currentDate = new Date();
    const bookArr = `[
      ${JSON.stringify(generateBook('A', 'A', 3, currentDate.getTime(), 0))},
      ${JSON.stringify(generateBook('B', 'B', 4, addDays(currentDate, 1).getTime(), 1))},
      ${JSON.stringify(generateBook('C', 'C', 5, addDays(currentDate, 2).getTime(), 2))}
    ]`;

    const updatedState = booksReducer(initialState, {
      type: actions.ADD_EXISTING_BOOKS,
      books: bookArr
    });

    const filteredState = booksReducer(updatedState, {
      type: actions.FILTER_BOOK,
      option: 'rating',
      optionText: 'Rating',
      filterDirection: '',
      search: ''
    });

    expect(filteredState.list.get(0).title).toBe('A');
    expect(filteredState.list.get(1).title).toBe('B');
    expect(filteredState.list.get(2).title).toBe('C');
  });

  it('should search book list and match title', () => {
    const initialState = booksReducer(undefined, {});

    const currentDate = new Date();
    const bookArr = `[
      ${JSON.stringify(generateBook('Test', 'Writer', 3, currentDate.getTime(), 0))},
      ${JSON.stringify(generateBook('B', 'Author', 4, addDays(currentDate, 1).getTime(), 1))},
      ${JSON.stringify(generateBook('C', 'Author', 5, addDays(currentDate, 2).getTime(), 2))}
    ]`;

    const updatedState = booksReducer(initialState, {
      type: actions.ADD_EXISTING_BOOKS,
      books: bookArr
    });

    const searchedState = booksReducer(updatedState, {
      type: actions.SEARCH_BOOK,
      option: 'date',
      optionText: 'Date',
      filterDirection: DESC,
      search: 'Test'
    });

    expect(searchedState.bookCount).toBe(3);
    expect(searchedState.list.size).toBe(1);
    expect(searchedState.list.get(0).title).toBe('Test');
  });

  it('should search book list and match author', () => {
    const initialState = booksReducer(undefined, {});

    const currentDate = new Date();
    const bookArr = `[
      ${JSON.stringify(generateBook('Test', 'Writer', 3, currentDate.getTime(), 0))},
      ${JSON.stringify(generateBook('B', 'Author', 4, addDays(currentDate, 1).getTime(), 1))},
      ${JSON.stringify(generateBook('C', 'Author', 5, addDays(currentDate, 2).getTime(), 2))}
    ]`;

    const updatedState = booksReducer(initialState, {
      type: actions.ADD_EXISTING_BOOKS,
      books: bookArr
    });

    const searchedState = booksReducer(updatedState, {
      type: actions.SEARCH_BOOK,
      search: 'Author'
    });

    expect(searchedState.bookCount).toBe(3);
    expect(searchedState.list.size).toBe(2);
    expect(searchedState.list.get(0).title).toBe('C');
    expect(searchedState.list.get(1).title).toBe('B');
    expect(searchedState.list.get(0).author).toBe('Author');
  });

  it('should search book list and find no match', () => {
    const initialState = booksReducer(undefined, {});

    const currentDate = new Date();
    const bookArr = `[
      ${JSON.stringify(generateBook('Test', 'Z', 3, currentDate.getTime(), 0))},
      ${JSON.stringify(generateBook('B', 'Author', 4, addDays(currentDate, 1).getTime(), 1))},
      ${JSON.stringify(generateBook('C', 'Author', 5, addDays(currentDate, 2).getTime(), 2))}
    ]`;

    const updatedState = booksReducer(initialState, {
      type: actions.ADD_EXISTING_BOOKS,
      books: bookArr
    });

    const searchedState = booksReducer(updatedState, {
      type: actions.SEARCH_BOOK,
      search: 'xyz'
    });

    expect(searchedState.bookCount).toBe(3);
    expect(searchedState.list.size).toBe(0);
  });

  it('should login and return initial state', () => {
    const initialState = booksReducer(undefined, { type: userActions.LOGIN });
    expect(initialState).toMatchObject(defaultState);
  });

  it('should logout and return initial state', () => {
    const initialState = booksReducer(undefined, { type: userActions.LOGOUT });
    expect(initialState).toMatchObject(defaultState);
  });

  it('should not match any action and return current state', () => {
    const initialState = booksReducer(undefined, { type: 'bleh' });
    expect(initialState).toMatchObject(defaultState);
  });
});

const generateBook = (title, author, rating, date, id) => {
  return {
    title,
    author,
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
