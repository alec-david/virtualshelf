import booksReducer from '../../reducers/books';
import * as actions from '../../actions/book';

import { List } from 'immutable';
const DESC = 'DESC';

describe('books reducer', () => {
  it('should return the initial state', () => {
    expect(booksReducer(undefined, {})).toEqual({
      list: List(),
      bookCount: 0,
      option: 'date',
      optionText: 'Date Read',
      filterDirection: DESC,
      search: '',
      loadedBooks: 50
    });
  });
});
