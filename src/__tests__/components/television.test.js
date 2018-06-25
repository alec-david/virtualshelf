import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Television from '../../components/television/Television';
import TelevisionCardContent from '../../components/television/TelevisionCardContent';
import { Card, Image } from 'semantic-ui-react';

Enzyme.configure({ adapter: new Adapter() });

function createProps() {
  const television = {
    date: 1528588800000,
    description: '',
    episode: null,
    flagged: 0,
    id: 3,
    image_url: 'https://example.com/Billions-KeyArt.jpg',
    rating: 5,
    season: 3,
    title: 'Billions',
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
    television,
    user,
    handleSettings
  };
}

function setup() {
  const props = createProps();
  const enzymeWrapper = shallow(<Television {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('television components', () => {
  describe('<Television />', () => {
    it('should render self and subcomponents', () => {
      const { props, enzymeWrapper } = setup();

      expect(enzymeWrapper.find(Card).length).toBe(1);
      expect(enzymeWrapper.find(Image).length).toBe(1);
      expect(enzymeWrapper.find(TelevisionCardContent).length).toBe(1);

      expect(enzymeWrapper.find(Card).props().children.length).toBe(2);

      expect(enzymeWrapper.find(Image).props().centered).toBe(true);
      expect(enzymeWrapper.find(Image).props().src).toBe(props.television.image_url);

      expect(enzymeWrapper.find(TelevisionCardContent).props().television).toBe(props.television);
    });
  });

  describe('<AddNewTelevision />', () => {});

  describe('<TelevisionCardContent />', () => {});

  describe('<TelevisionEdit />', () => {});

  describe('<TelevisionList />', () => {});

  describe('<TelevisionPage />', () => {});

  describe('<NewTelevision />', () => {});
});
