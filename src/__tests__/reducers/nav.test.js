import navReducer from '../../reducers/nav';
import * as actions from '../../actions/nav';

const defaultState = {
  activeItem: '/',
  visible: false,
  fixed: false
};

describe('nav reducer', () => {
  it('should return the initial state', () => {
    expect(navReducer(undefined, {})).toEqual(defaultState);
  });

  it('should set the active item', () => {
    const initialState = navReducer(undefined, {});

    const activeItem = 'test';
    const activeItemState = navReducer(initialState, {
      activeItem,
      type: actions.SET_ACTIVE_ITEM
    });
    expect(activeItemState.activeItem).toBe(activeItem);
  });

  it('should toggle the visible value', () => {
    const initialState = navReducer(undefined, {});

    const firstToggleState = navReducer(initialState, {
      type: actions.TOGGLE_VISIBLE
    });
    expect(firstToggleState.visible).not.toBe(initialState.visible);

    const secondToggleState = navReducer(firstToggleState, {
      type: actions.TOGGLE_VISIBLE
    });
    expect(secondToggleState.visible).not.toBe(firstToggleState.visible);
    expect(secondToggleState.visible).toBe(initialState.visible);
  });

  it('should not match any action and return current state', () => {
    const initialState = navReducer(undefined, { type: 'bleh' });
    expect(initialState).toMatchObject(defaultState);
  });
});
