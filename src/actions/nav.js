export const SET_ACTIVE_ITEM = 'SET_ACTIVE_ITEM';
export const TOGGLE_VISIBLE = 'TOGGLE_VISIBLE';

export const updateActiveItem = activeItem => {
  return {
    activeItem,
    type: SET_ACTIVE_ITEM
  };
};

export const toggleVisible = () => {
  return {
    type: TOGGLE_VISIBLE
  };
};
