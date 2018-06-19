import itemsReducer from '../../reducers/items';
import * as actions from '../../actions/item';
import * as userActions from '../../actions/user';

const defaultState = {
  filter: 'date',
  direction: 'DESC',
  search: '',
  loadedItems: 50
};

describe('items reducer', () => {
  it('should return the initial state', () => {
    expect(itemsReducer(undefined, {})).toEqual(defaultState);
  });

  it('should set the filter and direction values, given valid vals', () => {
    const initialState = itemsReducer(undefined, {});
    const filterState = itemsReducer(initialState, {
      type: actions.FILTER_ITEM,
      option: 'title',
      filterDirection: 'DESC'
    });
    expect(filterState.direction).toBe('DESC');
    expect(filterState.filter).toBe('title');
  });

  it('should set the search value, given valid val', () => {
    const initialState = itemsReducer(undefined, {});
    const searchState = itemsReducer(initialState, {
      type: actions.SEARCH_ITEM,
      search: 'test'
    });
    expect(searchState.search).toBe('test');
  });

  it('should increase the loadedItems value', () => {
    const initialState = itemsReducer(undefined, {});
    const loadedItemState = itemsReducer(initialState, {
      type: actions.LOAD_MORE_ITEMS
    });
    expect(loadedItemState.loadedItems).toBeGreaterThan(initialState.loadedItems);
  });

  it('should login and return default state', () => {
    const initialState = itemsReducer(undefined, {});
    const loginState = itemsReducer(initialState, {
      type: userActions.LOGIN
    });
    expect(loginState).toMatchObject(defaultState);
  });

  it('should logout and return default state', () => {
    const initialState = itemsReducer(undefined, {});
    const logoutState = itemsReducer(initialState, {
      type: userActions.LOGOUT
    });
    expect(logoutState).toMatchObject(defaultState);
  });

  it('should not match any action and return current state', () => {
    const initialState = itemsReducer(undefined, { type: 'bleh' });
    expect(initialState).toMatchObject(defaultState);
  });
});
