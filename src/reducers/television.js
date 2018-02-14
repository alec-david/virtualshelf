import { List } from 'immutable';

const television = (state = List(), action) => {
  switch (action.type) {
    case 'ADD_TV':
      return state.push({
        id: action.id,
        title: action.title,
        network: action.network,
        rating: action.rating,
        date: action.date
      });
    case 'DELETE_TV':
      return state.filter(television => television.id !== action.id);
    default:
      return state;
  }
};

export default television;
