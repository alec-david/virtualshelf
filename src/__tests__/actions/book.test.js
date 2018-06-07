import * as actions from '../../actions/book';

describe('hydrate books', () => {
  it('should create an action to add existing books to book store list', () => {
    const books = ['example book1', 'example book2'];
    const expectedAction = {
      type: actions.ADD_EXISTING_BOOKS,
      books
    };
    expect(actions.hydrateBooks(books)).toEqual(expectedAction);
  });
});
