import React from 'react';
import { Button, Container, Header, Grid } from 'semantic-ui-react';

const ProfileView = () => (
  <Container text>
    <Header as='h2'>Profile</Header>
    <p>Email: bleh@bleh.com</p>
    <Button>Edit Profile</Button>
    <Button>Update Password</Button>
    <Button>Logout</Button>
    <Button negative>Delete Account</Button>
  </Container>
)

export default ProfileView