const user = (state = { id: 1 }, action) => {
  switch (action.type) {
    case 'ADD_NEW_USER':
      return { id: action.id };
    case 'DELETE_USER':
      return { id: -1 };
    case 'ADD_EXISTING_USER':
      return { id: action.id };
    default:
      return state;
  }
};

export default user;
