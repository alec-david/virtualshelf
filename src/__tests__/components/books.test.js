import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Card, Image } from 'semantic-ui-react';
import Book from '../../components/books/Book';
import BookCardContent from '../../components/books/BookCardContent';

Enzyme.configure({ adapter: new Adapter() });

function createProps() {
  const book = {
    author: 'Haruki Murakami',
    date: 1529182631194,
    description: '',
    flagged: 0,
    id: 56,
    image_url: 'https://example.com/1Q84bookcover.jpg',
    rating: 5,
    title: '1Q84',
    username: 'a@example.com'
  };

  const user = {
    email: 'a@example.com',
    hydratedBooks: true,
    hydratedMovies: true,
    hydratedTelevision: true,
    loggingIn: false,
    token: '',
    verified: false
  };

  const handleSettings = () => {
    console.log('settings clicked');
  };

  return {
    book,
    user,
    handleSettings
  };
}

function setup() {
  const props = createProps();
  const enzymeWrapper = shallow(<Book {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('book components', () => {
  describe('<Book />', () => {
    it('should render self and subcomponents', () => {
      const { props, enzymeWrapper } = setup();

      expect(enzymeWrapper.find(Card).length).toBe(1);
      expect(enzymeWrapper.find(Image).length).toBe(1);
      expect(enzymeWrapper.find(BookCardContent).length).toBe(1);

      expect(enzymeWrapper.find(Card).props().children.length).toBe(2);

      expect(enzymeWrapper.find(Image).props().centered).toBe(true);
      expect(enzymeWrapper.find(Image).props().src).toBe(props.book.image_url);

      expect(enzymeWrapper.find(BookCardContent).props().book).toBe(props.book);
    });
  });

  describe('<AddNewBook />', () => {});

  describe('<BookCardContent />', () => {});

  describe('<BookEdit />', () => {});

  describe('<BookList />', () => {});

  describe('<BookPage />', () => {});

  describe('<NewBook />', () => {});
});
