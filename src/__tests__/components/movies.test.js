import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Movie from '../../components/movies/Movie';
import MovieCardContent from '../../components/movies/MovieCardContent';
import { Card, Image } from 'semantic-ui-react';

Enzyme.configure({ adapter: new Adapter() });

function createProps() {
  const movie = {
    date: 1527969600000,
    description: '',
    director: 'Wes Anderson',
    flagged: 0,
    id: 6,
    image_url: 'https://example.com/IsleOfDogsFirstLook.jpg',
    rating: 5,
    title: 'Isle of Dogs',
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
    movie,
    user,
    handleSettings
  };
}

function setup() {
  const props = createProps();
  const enzymeWrapper = shallow(<Movie {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('movie components', () => {
  describe('<Movie />', () => {
    it('should render self and subcomponents', () => {
      const { props, enzymeWrapper } = setup();

      expect(enzymeWrapper.find(Card).length).toBe(1);
      expect(enzymeWrapper.find(Image).length).toBe(1);
      expect(enzymeWrapper.find(MovieCardContent).length).toBe(1);

      expect(enzymeWrapper.find(Card).props().children.length).toBe(2);

      expect(enzymeWrapper.find(Image).props().centered).toBe(true);
      expect(enzymeWrapper.find(Image).props().src).toBe(props.movie.image_url);

      expect(enzymeWrapper.find(MovieCardContent).props().movie).toBe(props.movie);
    });
  });

  describe('<AddNewMovie />', () => {});

  describe('<MovieCardContent />', () => {});

  describe('<MovieEdit />', () => {});

  describe('<MovieList />', () => {});

  describe('<MoviePage />', () => {});

  describe('<NewMovie />', () => {});
});
