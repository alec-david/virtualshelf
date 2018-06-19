import televisionReducer from '../../reducers/television';
import * as actions from '../../actions/television';
import * as userActions from '../../actions/user';

import { List } from 'immutable';
const DESC = 'DESC';

const defaultState = {
  list: List(),
  televisionCount: 0,
  option: 'date',
  optionText: 'Date Watched',
  filterDirection: DESC,
  search: '',
  loadedTelevision: 50
};

describe('television reducer', () => {
  it('should return the initial state', () => {
    expect(televisionReducer(undefined, {})).toEqual(defaultState);
  });

  it('should add new television when passed ADD_NEW_TELEVISION', () => {
    const exampleTelevision = {
      title: 'Test Title',
      season: 1,
      description: '',
      date: new Date().getTime(),
      rating: 3
    };

    const updatedState = televisionReducer(undefined, {
      type: actions.ADD_NEW_TELEVISION,
      television: exampleTelevision
    });
    expect(updatedState.televisionCount).toEqual(1);
    expect(updatedState.list.size).toEqual(1);
    expect(updatedState.list.get(0).television).toEqual(exampleTelevision);
  });

  it('should add existing television returned from database', () => {
    const televisionArr = `[
      ${JSON.stringify(generateTelevision('A', 1, 3, new Date().getTime(), 0))},
      ${JSON.stringify(generateTelevision('B', 1, 4, new Date().getTime(), 1))},
      ${JSON.stringify(generateTelevision('C', 1, 5, new Date().getTime(), 2))}
    ]`;

    const updatedState = televisionReducer(undefined, {
      type: actions.ADD_EXISTING_TELEVISION,
      television: televisionArr
    });

    expect(updatedState.televisionCount).toBe(3);
    expect(updatedState.list.size).toBe(3);

    let titleExists = true;
    for (let i = 0; i < updatedState.list.size; i++) {
      titleExists = 'ABC'.includes(updatedState.list.get(i).title);
    }
    expect(titleExists).toBeTruthy();
  });

  it('should load more television by increasing loadedTelevision value', () => {
    const initialTelevisionLoaded = televisionReducer(undefined, {}).loadedTelevision;
    const moreTelevisionLoaded = televisionReducer(undefined, {
      type: actions.LOAD_MORE_TELEVISION
    }).loadedTelevision;
    expect(moreTelevisionLoaded).toBeGreaterThan(initialTelevisionLoaded);
  });

  it('should delete a television, given list of television and valid id', () => {
    const televisionArr = `[
      ${JSON.stringify(generateTelevision('A', 1, 3, new Date().getTime(), 0))},
      ${JSON.stringify(generateTelevision('B', 1, 4, new Date().getTime(), 1))},
      ${JSON.stringify(generateTelevision('C', 1, 5, new Date().getTime(), 2))}
    ]`;

    const updatedState = televisionReducer(undefined, {
      type: actions.ADD_EXISTING_TELEVISION,
      television: televisionArr
    });

    const stateAfterDeletion = televisionReducer(updatedState, {
      type: actions.DELETE_TELEVISION,
      id: 2
    });
    expect(stateAfterDeletion.televisionCount).toBe(2);
    expect(stateAfterDeletion.list.size).toBe(2);
    expect(stateAfterDeletion.list.get(0).title).toBe('A');
    expect(stateAfterDeletion.list.get(1).title).toBe('B');
  });

  it('should not delete a television, given list of television and invalid id', () => {
    const televisionArr = `[
      ${JSON.stringify(generateTelevision('A', 1, 3, new Date().getTime(), 0))},
      ${JSON.stringify(generateTelevision('B', 1, 4, new Date().getTime(), 1))},
      ${JSON.stringify(generateTelevision('C', 1, 5, new Date().getTime(), 2))}
    ]`;

    const updatedState = televisionReducer(undefined, {
      type: actions.ADD_EXISTING_TELEVISION,
      television: televisionArr
    });

    const stateAfterDeletion = televisionReducer(updatedState, {
      type: actions.DELETE_TELEVISION,
      id: -1
    });
    expect(stateAfterDeletion.televisionCount).toBe(3);
    expect(stateAfterDeletion.list.size).toBe(3);
  });

  it('should update television status to edit given valid id', () => {
    const initialState = televisionReducer(undefined, {});
    const stateAterAddingTelevision = televisionReducer(initialState, {
      type: actions.ADD_NEW_TELEVISION,
      ...generateTelevision('A', 1, 3, new Date().getTime(), 0)
    });

    const stateAfterEditTelevision = televisionReducer(stateAterAddingTelevision, {
      type: actions.EDIT_TELEVISION,
      id: 0
    });
    expect(stateAfterEditTelevision.list.get(0).edit).toBeTruthy();
  });

  it('should not update television status to edit given invalid id', () => {
    const initialState = televisionReducer(undefined, {});
    const stateAterAddingTelevision = televisionReducer(initialState, {
      type: actions.ADD_NEW_TELEVISION,
      ...generateTelevision('A', 1, 3, new Date().getTime(), 0)
    });

    const stateAfterEditTelevision = televisionReducer(stateAterAddingTelevision, {
      type: actions.EDIT_TELEVISION,
      id: 1
    });
    expect(stateAfterEditTelevision.list.get(0).edit).toBeTruthy();
  });

  it('should update television, given valid television id and updated details', () => {
    const initialState = televisionReducer(undefined, {});
    const stateAterAddingTelevision = televisionReducer(initialState, {
      type: actions.ADD_NEW_TELEVISION,
      ...generateTelevision('A', 1, 3, new Date().getTime(), 0)
    });

    expect(stateAterAddingTelevision.list.get(0).title).toBe('A');
    expect(stateAterAddingTelevision.list.get(0).season).toBe(1);
    expect(stateAterAddingTelevision.list.get(0).rating).toBe(3);

    const stateAfterUpdateTelevision = televisionReducer(stateAterAddingTelevision, {
      type: actions.UPDATE_TELEVISION,
      id: 0,
      title: 'B',
      season: 2,
      rating: 5
    });
    expect(stateAfterUpdateTelevision.list.get(0).title).toBe('B');
    expect(stateAfterUpdateTelevision.list.get(0).season).toBe(2);
    expect(stateAfterUpdateTelevision.list.get(0).rating).toBe(5);
  });

  it('should filter television list by descending date (newest -> oldest)', () => {
    const initialState = televisionReducer(undefined, {});

    const currentDate = new Date();
    const televisionArr = `[
      ${JSON.stringify(generateTelevision('A', 1, 3, currentDate.getTime(), 0))},
      ${JSON.stringify(generateTelevision('B', 1, 4, addDays(currentDate, 1).getTime(), 1))},
      ${JSON.stringify(generateTelevision('C', 1, 5, addDays(currentDate, 2).getTime(), 2))}
    ]`;

    const updatedState = televisionReducer(initialState, {
      type: actions.ADD_EXISTING_TELEVISION,
      television: televisionArr
    });

    const filteredState = televisionReducer(updatedState, {
      type: actions.FILTER_TELEVISION,
      option: 'date',
      optionText: 'Date',
      filterDirection: DESC,
      search: ''
    });

    expect(filteredState.list.get(0).title).toBe('C');
    expect(filteredState.list.get(1).title).toBe('B');
    expect(filteredState.list.get(2).title).toBe('A');
  });

  it('should filter television list by ascending date (oldest -> newest)', () => {
    const initialState = televisionReducer(undefined, {});

    const currentDate = new Date();
    const televisionArr = `[
      ${JSON.stringify(generateTelevision('A', 1, 3, currentDate.getTime(), 0))},
      ${JSON.stringify(generateTelevision('B', 1, 4, addDays(currentDate, 1).getTime(), 1))},
      ${JSON.stringify(generateTelevision('C', 1, 5, addDays(currentDate, 2).getTime(), 2))}
    ]`;

    const updatedState = televisionReducer(initialState, {
      type: actions.ADD_EXISTING_TELEVISION,
      television: televisionArr
    });

    const filteredState = televisionReducer(updatedState, {
      type: actions.FILTER_TELEVISION,
      option: 'date',
      optionText: 'Date',
      filterDirection: '',
      search: ''
    });

    expect(filteredState.list.get(0).title).toBe('A');
    expect(filteredState.list.get(1).title).toBe('B');
    expect(filteredState.list.get(2).title).toBe('C');
  });

  it('should filter television list by descending title (A -> Z)', () => {
    const initialState = televisionReducer(undefined, {});

    const currentDate = new Date();
    const televisionArr = `[
      ${JSON.stringify(generateTelevision('A', 1, 3, currentDate.getTime(), 0))},
      ${JSON.stringify(generateTelevision('B', 1, 4, addDays(currentDate, 1).getTime(), 1))},
      ${JSON.stringify(generateTelevision('C', 1, 5, addDays(currentDate, 2).getTime(), 2))}
    ]`;

    const updatedState = televisionReducer(initialState, {
      type: actions.ADD_EXISTING_TELEVISION,
      television: televisionArr
    });

    const filteredState = televisionReducer(updatedState, {
      type: actions.FILTER_TELEVISION,
      option: 'title',
      optionText: 'Title',
      filterDirection: DESC,
      search: ''
    });

    expect(filteredState.list.get(0).title).toBe('A');
    expect(filteredState.list.get(1).title).toBe('B');
    expect(filteredState.list.get(2).title).toBe('C');
  });

  it('should filter television list by ascending title (Z -> A)', () => {
    const initialState = televisionReducer(undefined, {});

    const currentDate = new Date();
    const televisionArr = `[
      ${JSON.stringify(generateTelevision('A', 1, 3, currentDate.getTime(), 0))},
      ${JSON.stringify(generateTelevision('B', 1, 4, addDays(currentDate, 1).getTime(), 1))},
      ${JSON.stringify(generateTelevision('C', 1, 5, addDays(currentDate, 2).getTime(), 2))}
    ]`;

    const updatedState = televisionReducer(initialState, {
      type: actions.ADD_EXISTING_TELEVISION,
      television: televisionArr
    });

    const filteredState = televisionReducer(updatedState, {
      type: actions.FILTER_TELEVISION,
      option: 'title',
      optionText: 'Title',
      filterDirection: '',
      search: ''
    });

    expect(filteredState.list.get(0).title).toBe('C');
    expect(filteredState.list.get(1).title).toBe('B');
    expect(filteredState.list.get(2).title).toBe('A');
  });

  it('should filter television list by descending rating (5 -> 1)', () => {
    const initialState = televisionReducer(undefined, {});

    const currentDate = new Date();
    const televisionArr = `[
      ${JSON.stringify(generateTelevision('A', 1, 3, currentDate.getTime(), 0))},
      ${JSON.stringify(generateTelevision('B', 1, 4, addDays(currentDate, 1).getTime(), 1))},
      ${JSON.stringify(generateTelevision('C', 1, 5, addDays(currentDate, 2).getTime(), 2))}
    ]`;

    const updatedState = televisionReducer(initialState, {
      type: actions.ADD_EXISTING_TELEVISION,
      television: televisionArr
    });

    const filteredState = televisionReducer(updatedState, {
      type: actions.FILTER_TELEVISION,
      option: 'rating',
      optionText: 'Rating',
      filterDirection: DESC,
      search: ''
    });

    expect(filteredState.list.get(0).title).toBe('C');
    expect(filteredState.list.get(1).title).toBe('B');
    expect(filteredState.list.get(2).title).toBe('A');
  });

  it('should filter television list by ascending rating (1 -> 5)', () => {
    const initialState = televisionReducer(undefined, {});

    const currentDate = new Date();
    const televisionArr = `[
      ${JSON.stringify(generateTelevision('A', 1, 3, currentDate.getTime(), 0))},
      ${JSON.stringify(generateTelevision('B', 1, 4, addDays(currentDate, 1).getTime(), 1))},
      ${JSON.stringify(generateTelevision('C', 1, 5, addDays(currentDate, 2).getTime(), 2))}
    ]`;

    const updatedState = televisionReducer(initialState, {
      type: actions.ADD_EXISTING_TELEVISION,
      television: televisionArr
    });

    const filteredState = televisionReducer(updatedState, {
      type: actions.FILTER_TELEVISION,
      option: 'rating',
      optionText: 'Rating',
      filterDirection: '',
      search: ''
    });

    expect(filteredState.list.get(0).title).toBe('A');
    expect(filteredState.list.get(1).title).toBe('B');
    expect(filteredState.list.get(2).title).toBe('C');
  });

  it('should search television list and match title', () => {
    const initialState = televisionReducer(undefined, {});

    const currentDate = new Date();
    const televisionArr = `[
      ${JSON.stringify(generateTelevision('Test', 1, 3, currentDate.getTime(), 0))},
      ${JSON.stringify(generateTelevision('B', 1, 4, addDays(currentDate, 1).getTime(), 1))},
      ${JSON.stringify(generateTelevision('C', 2, 5, addDays(currentDate, 2).getTime(), 2))}
    ]`;

    const updatedState = televisionReducer(initialState, {
      type: actions.ADD_EXISTING_TELEVISION,
      television: televisionArr
    });

    const searchedState = televisionReducer(updatedState, {
      type: actions.SEARCH_TELEVISION,
      option: 'date',
      optionText: 'Date',
      filterDirection: DESC,
      search: 'Test'
    });

    expect(searchedState.televisionCount).toBe(3);
    expect(searchedState.list.size).toBe(1);
    expect(searchedState.list.get(0).title).toBe('Test');
  });

  it('should search television list and find no match', () => {
    const initialState = televisionReducer(undefined, {});

    const currentDate = new Date();
    const televisionArr = `[
      ${JSON.stringify(generateTelevision('Test', 1, 3, currentDate.getTime(), 0))},
      ${JSON.stringify(generateTelevision('B', 2, 4, addDays(currentDate, 1).getTime(), 1))},
      ${JSON.stringify(generateTelevision('C', 3, 5, addDays(currentDate, 2).getTime(), 2))}
    ]`;

    const updatedState = televisionReducer(initialState, {
      type: actions.ADD_EXISTING_TELEVISION,
      television: televisionArr
    });

    const searchedState = televisionReducer(updatedState, {
      type: actions.SEARCH_TELEVISION,
      search: 'xyz'
    });

    expect(searchedState.televisionCount).toBe(3);
    expect(searchedState.list.size).toBe(0);
  });

  it('should login and return initial state', () => {
    const initialState = televisionReducer(undefined, { type: userActions.LOGIN });
    expect(initialState).toMatchObject(defaultState);
  });

  it('should logout and return initial state', () => {
    const initialState = televisionReducer(undefined, { type: userActions.LOGOUT });
    expect(initialState).toMatchObject(defaultState);
  });

  it('should not match any action and return current state', () => {
    const initialState = televisionReducer(undefined, { type: 'bleh' });
    expect(initialState).toMatchObject(defaultState);
  });
});

const generateTelevision = (title, season, rating, date, id) => {
  return {
    title,
    season,
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
