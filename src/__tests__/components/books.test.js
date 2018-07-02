import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { List } from 'immutable';

import { Button, Card, Form, Header, Image, Rating } from 'semantic-ui-react';

import AddNewBook from '../../components/books/AddNewBook';
import Book from '../../components/books/Book';
import BookCardContent from '../../components/books/BookCardContent';
import BookEdit from '../../components/books/BookEdit';
import BookList from '../../components/books/BookList';
import BookPage from '../../components/books/BookPage';
import NewBook from '../../components/books/NewBook';

import BookCard from '../../containers/books/BookCard';
import FilterBook from '../../containers/books/FilterBook';
import NewBookCard from '../../containers/books/NewBookCard';
import VisibleBookList from '../../containers/books/VisibleBookList';

import CardSettings from '../../components/util/CardSettings';
import DatePicker from '../../components/util/DatePicker';
import SrcText from '../../components/util/SrcText';

Enzyme.configure({ adapter: new Adapter() });

describe('book components', () => {
  describe('<Book />', () => {
    it('should render <Book /> and subcomponents', () => {
      const props = {
        book: generateBookObject(),
        user: generateUserObject,
        handleSettings: () => {}
      };
      const enzymeWrapper = shallow(<Book {...props} />);

      expect(enzymeWrapper.find(Card).length).toBe(1);
      expect(enzymeWrapper.find(Image).length).toBe(1);
      expect(enzymeWrapper.find(BookCardContent).length).toBe(1);

      expect(enzymeWrapper.find(Card).props().children.length).toBe(2);

      expect(enzymeWrapper.find(Image).props().centered).toBe(true);
      expect(enzymeWrapper.find(Image).props().src).toBe(props.book.image_url);

      expect(enzymeWrapper.find(BookCardContent).props().book).toBe(props.book);
    });
  });

  describe('<AddNewBook />', () => {
    it('should render <AddNewBook /> and subcomponents', () => {
      const props = {
        addNewBook: () => {}
      };
      const enzymeWrapper = shallow(<AddNewBook {...props} />);

      expect(enzymeWrapper.find(Card).length).toBe(1);
      expect(enzymeWrapper.find(Image).length).toBe(1);
      expect(enzymeWrapper.find(Card.Content).length).toBe(1);
      expect(enzymeWrapper.find(Card.Header).length).toBe(1);

      expect(enzymeWrapper.find(Image).props().centered).toBe(true);
      expect(enzymeWrapper.find(Image).props().fluid).toBe(true);
      expect(enzymeWrapper.find(Image).props().onClick).toBe(props.addNewBook);
      expect(enzymeWrapper.find(Image).props().src).toBe('plus.png');
      expect(enzymeWrapper.find(Image).props().style).not.toBe({});

      expect(enzymeWrapper.find(Card.Header).props().children).toBe('Add a new book');
    });
  });

  describe('<BookCardContent />', () => {
    it('should render <BookCardContent /> and subcomponents', () => {
      const props = {
        book: generateBookObject(),
        email: 'a@example.com',
        handleSettings: () => {}
      };
      const enzymeWrapper = shallow(<BookCardContent {...props} />);

      expect(enzymeWrapper.find(Card.Content).length).toBe(1);
      expect(enzymeWrapper.find(Card.Header).length).toBe(1);
      expect(enzymeWrapper.find(CardSettings).length).toBe(1);
      expect(enzymeWrapper.find(Card.Meta).length).toBe(1);
      expect(enzymeWrapper.find(Rating).length).toBe(1);
      expect(enzymeWrapper.find(Card.Description).length).toBe(1);

      expect(enzymeWrapper.find(Card.Header).props().children[1]).toBe(props.book.title);

      expect(enzymeWrapper.find(CardSettings).props().email).toBe(props.email);
      expect(enzymeWrapper.find(CardSettings).props().handleSettings).toBe(props.handleSettings);
      expect(enzymeWrapper.find(CardSettings).props().item).toBe(props.book);

      expect(
        enzymeWrapper
          .find(Card.Meta)
          .props()
          .children.includes(props.book.author)
      ).toBe(true);
      expect(
        enzymeWrapper
          .find(Card.Meta)
          .props()
          .children.includes(new Date(props.book.date).toLocaleDateString())
      ).toBe(true);

      expect(enzymeWrapper.find(Rating).props().maxRating).toBe(5);
      expect(enzymeWrapper.find(Rating).props().icon).toBe('star');
      expect(enzymeWrapper.find(Rating).props().rating).toBe(props.book.rating);
      expect(enzymeWrapper.find(Rating).props().disabled).toBe(true);
      expect(enzymeWrapper.find(Rating).props().size).toBe('small');

      expect(enzymeWrapper.find(Card.Description).props().style).not.toBe({});
      expect(enzymeWrapper.find(Card.Description).props().children).toBe(props.book.description);
    });
  });

  describe('<BookEdit />', () => {
    it('should render <BookEdit /> and subcomponents', () => {
      const props = {
        book: generateBookObject(),
        saveEdit: () => {},
        cancelEdit: () => {},
        handleChange: () => {},
        handleDateChange: () => {},
        toggleFocus: () => {},
        disableFutureDays: () => {}
      };
      const enzymeWrapper = shallow(<BookEdit {...props} />);

      expect(enzymeWrapper.find(Card).length).toBe(1);
      expect(enzymeWrapper.find(Card.Content).length).toBe(2);
      expect(enzymeWrapper.find(Form).length).toBe(1);
      expect(enzymeWrapper.find(Form.Input).length).toBe(2);
      expect(enzymeWrapper.find(Form.TextArea).length).toBe(1);
      expect(enzymeWrapper.find(DatePicker).length).toBe(1);
      expect(enzymeWrapper.find(Rating).length).toBe(1);
      expect(enzymeWrapper.find(Button).length).toBe(2);

      expect(enzymeWrapper.find(Form).props().size).toBe('large');

      expect(
        enzymeWrapper
          .find(Form.Input)
          .at(0)
          .props().label
      ).toBe('Title');
      expect(
        enzymeWrapper
          .find(Form.Input)
          .at(0)
          .props().value
      ).toBe(props.book.title);
      expect(
        enzymeWrapper
          .find(Form.Input)
          .at(0)
          .props().onChange
      ).toBe(props.handleChange);
      expect(
        enzymeWrapper
          .find(Form.Input)
          .at(0)
          .props().autoFocus
      ).toBe(true);
      expect(
        enzymeWrapper
          .find(Form.Input)
          .at(0)
          .props().required
      ).toBe(true);

      expect(
        enzymeWrapper
          .find(Form.Input)
          .at(1)
          .props().label
      ).toBe('Author');
      expect(
        enzymeWrapper
          .find(Form.Input)
          .at(1)
          .props().value
      ).toBe(props.book.author);
      expect(
        enzymeWrapper
          .find(Form.Input)
          .at(1)
          .props().onChange
      ).toBe(props.handleChange);
      expect(
        enzymeWrapper
          .find(Form.Input)
          .at(1)
          .props().required
      ).toBe(true);

      expect(enzymeWrapper.find(Form.TextArea).props().label).toBe('Brief Review/Description');
      expect(enzymeWrapper.find(Form.TextArea).props().value).toBe(props.book.description);
      expect(enzymeWrapper.find(Form.TextArea).props().onChange).toBe(props.handleChange);

      expect(enzymeWrapper.find(DatePicker).props().label).toBe('Date Read');
      expect(enzymeWrapper.find(DatePicker).props().date).toBe(props.book.editDate);
      expect(enzymeWrapper.find(DatePicker).props().focus).toBe(props.book.focus);
      expect(enzymeWrapper.find(DatePicker).props().handleDateChange).toBe(props.handleDateChange);
      expect(enzymeWrapper.find(DatePicker).props().toggleFocus).toBe(props.toggleFocus);
      expect(enzymeWrapper.find(DatePicker).props().disableFutureDays).toBe(
        props.disableFutureDays
      );

      expect(enzymeWrapper.find(Rating).props().icon).toBe('star');
      expect(enzymeWrapper.find(Rating).props().rating).toBe(props.book.rating);

      expect(
        enzymeWrapper
          .find(Button)
          .at(0)
          .props().color
      ).toBe('red');
      expect(
        enzymeWrapper
          .find(Button)
          .at(0)
          .props().floated
      ).toBe('left');
      expect(
        enzymeWrapper
          .find(Button)
          .at(0)
          .props().children
      ).toBe('Cancel');

      expect(
        enzymeWrapper
          .find(Button)
          .at(1)
          .props().color
      ).toBe('green');
      expect(
        enzymeWrapper
          .find(Button)
          .at(1)
          .props().floated
      ).toBe('right');
      expect(
        enzymeWrapper
          .find(Button)
          .at(1)
          .props().children
      ).toBe('Save');
    });
  });

  describe('<BookList />', () => {
    it('should render <BookList /> and subcomponents. Given user logged in, should show add new book card', () => {
      const props = {
        books: generateBookList(),
        user: generateUserObject()
      };
      const enzymeWrapper = shallow(<BookList {...props} />);

      expect(enzymeWrapper.find(Card.Group).length).toBe(1);
      expect(enzymeWrapper.find(NewBookCard).length).toBe(1);
      expect(enzymeWrapper.find(BookCard).length).toBe(props.books.list.size);
      expect(enzymeWrapper.find(SrcText).length).toBe(1);

      expect(
        enzymeWrapper
          .find(BookCard)
          .at(0)
          .props().book
      ).toBe(props.books.list.get(0));
      expect(
        enzymeWrapper
          .find(BookCard)
          .at(1)
          .props().book
      ).toBe(props.books.list.get(1));
      expect(
        enzymeWrapper
          .find(BookCard)
          .at(2)
          .props().book
      ).toBe(props.books.list.get(2));

      expect(enzymeWrapper.find(SrcText).props().itemCount).toBe(props.books.bookCount);
    });

    it('should render <BookList /> and subcomponents. Given user not logged in, should not show add new book card', () => {
      const props = {
        books: generateBookList(),
        user: generateLoggedOutUserObject()
      };
      const enzymeWrapper = shallow(<BookList {...props} />);

      expect(enzymeWrapper.find(NewBookCard).length).toBe(0);
    });
  });

  describe('<BookPage />', () => {
    it('should render <BookPage /> and subcomponents. Given user logged in, no books added yet -> should show "Get started by adding a book" message', () => {
      const props = {
        itemCount: 0,
        loggedIn: true
      };
      const enzymeWrapper = shallow(<BookPage {...props} />);

      expect(enzymeWrapper.find(Header).length).toBe(1);
      expect(enzymeWrapper.find(Header.Content).length).toBe(1);
      expect(enzymeWrapper.find(FilterBook).length).toBe(1);
      expect(enzymeWrapper.find(VisibleBookList).length).toBe(1);

      expect(enzymeWrapper.find(Header.Content).props().children).toBe(
        'Get Started by Adding a Book!'
      );
    });

    it('should render <BookPage /> and subcomponents. Given user logged in and books added -> should show "Books Youve Read" message', () => {
      const props = {
        itemCount: 5,
        loggedIn: true
      };
      const enzymeWrapper = shallow(<BookPage {...props} />);

      expect(enzymeWrapper.find(Header.Content).props().children).toBe(`Books You've Read:`);
    });

    it('should render <BookPage /> and subcomponents. Given user not logged in and books added -> should show "Books Others Have Read" message', () => {
      const props = {
        itemCount: 5,
        loggedIn: false
      };
      const enzymeWrapper = shallow(<BookPage {...props} />);

      expect(enzymeWrapper.find(Header.Content).props().children).toBe(`Books Others Have Read:`);
    });
  });

  describe('<NewBook />', () => {
    it('should render <NewBook /> and subcomponents', () => {
      const props = {
        book: generateBookObject(),
        cancel: () => {},
        handleChange: () => {},
        handleSubmit: () => {},
        handleDateChange: () => {},
        toggleFocus: () => {},
        disableFutureDays: () => {}
      };
      const enzymeWrapper = shallow(<NewBook {...props} />);

      expect(enzymeWrapper.find(Card).length).toBe(1);
      expect(enzymeWrapper.find(Card.Content).length).toBe(2);
      expect(enzymeWrapper.find(Form).length).toBe(1);
      expect(enzymeWrapper.find(Form.Input).length).toBe(2);
      expect(enzymeWrapper.find(Form.TextArea).length).toBe(1);
      expect(enzymeWrapper.find(DatePicker).length).toBe(1);
      expect(enzymeWrapper.find(Rating).length).toBe(1);
      expect(enzymeWrapper.find(Button).length).toBe(2);

      expect(
        enzymeWrapper
          .find(Form.Input)
          .at(0)
          .props().label
      ).toBe('Title');
      expect(
        enzymeWrapper
          .find(Form.Input)
          .at(0)
          .props().value
      ).toBe(props.book.title);
      expect(
        enzymeWrapper
          .find(Form.Input)
          .at(1)
          .props().label
      ).toBe('Author');
      expect(
        enzymeWrapper
          .find(Form.Input)
          .at(1)
          .props().value
      ).toBe(props.book.author);

      expect(enzymeWrapper.find(Form.TextArea).props().label).toBe('Brief Review/Description');
      expect(enzymeWrapper.find(Form.TextArea).props().value).toBe(props.book.description);

      expect(enzymeWrapper.find(DatePicker).props().label).toBe('Date Read');
      expect(enzymeWrapper.find(DatePicker).props().date).toBe(props.book.date);
      expect(enzymeWrapper.find(DatePicker).props().focus).toBe(props.book.focus);

      expect(enzymeWrapper.find(Rating).props().rating).toBe(props.book.rating);

      expect(
        enzymeWrapper
          .find(Button)
          .at(0)
          .props().color
      ).toBe('red');
      expect(
        enzymeWrapper
          .find(Button)
          .at(0)
          .props().floated
      ).toBe('left');
      expect(
        enzymeWrapper
          .find(Button)
          .at(0)
          .props().children
      ).toBe('Cancel');
      expect(
        enzymeWrapper
          .find(Button)
          .at(1)
          .props().color
      ).toBe('green');
      expect(
        enzymeWrapper
          .find(Button)
          .at(1)
          .props().floated
      ).toBe('right');
      expect(
        enzymeWrapper
          .find(Button)
          .at(1)
          .props().children
      ).toBe('Add');
    });
  });
});

const generateBookObject = () => {
  return {
    id: 0,
    author: 'Haruki Murakami',
    date: 1529182631194,
    editDate: 1529182631194,
    focus: false,
    description: 'Example description',
    flagged: 0,
    image_url: 'https://example.com/1Q84bookcover.jpg',
    rating: 5,
    title: '1Q84',
    username: 'a@example.com'
  };
};

const generateBookList = () => {
  return {
    list: List([
      {
        id: 0,
        author: 'Haruki Murakami',
        date: 1529182631194,
        editDate: 1529182631194,
        focus: false,
        description: 'Example description 0',
        flagged: 0,
        image_url: 'https://example.com/1Q84bookcover.jpg',
        rating: 5,
        title: '1Q84',
        username: 'a@example.com'
      },
      {
        id: 1,
        author: 'Haruki Murakami',
        date: 1526356800000,
        editDate: 1526356800000,
        focus: false,
        description: 'Example description 1',
        flagged: 0,
        image_url: 'https://example.com/windupbirdchroniclebookcover.jpg',
        rating: 5,
        title: 'The Wind-Up Bird Chronicle',
        username: 'a@example.com'
      },
      {
        id: 2,
        author: 'Haruki Murakami',
        date: 1527825600000,
        editDate: 1527825600000,
        focus: false,
        description: 'Example description 1',
        flagged: 0,
        image_url: 'https://example.com/kafkaontheshorebookcover.jpg',
        rating: 4,
        title: 'Kafka on the Shore',
        username: 'a@example.com'
      }
    ]),
    bookCount: 3
  };
};

const generateUserObject = () => {
  return {
    email: 'a@example.com',
    hydratedBooks: true,
    hydratedMovies: true,
    hydratedTelevision: true,
    loggingIn: false,
    token: 'abc',
    verified: false
  };
};

const generateLoggedOutUserObject = () => {
  return {
    email: '',
    hydratedBooks: true,
    hydratedMovies: true,
    hydratedTelevision: true,
    loggingIn: false,
    token: '',
    verified: false
  };
};
