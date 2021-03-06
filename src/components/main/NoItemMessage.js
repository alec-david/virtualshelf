import React from 'react';
import { Header, Container } from 'semantic-ui-react';

const headingPadding = {
  paddingLeft: '15px',
  paddingRight: '15px'
};

const NoItemMessage = () => (
  <Container text>
    <Header as="h1" textAlign="center" style={headingPadding}>
      <Header.Content>
        Virtual Shelf is a tool for keeping track of all the books you've read and movies and tv
        shows you've watched. Go to the books, movies, or television tab to get started!
      </Header.Content>
    </Header>
  </Container>
);

export default NoItemMessage;
