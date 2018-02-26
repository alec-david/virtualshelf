import React from 'react';
import { Button, Container, Header } from 'semantic-ui-react';

const ProfileView = (props) => {
  const { email,
          updatePassword,
          logout,
          deleteAccount
        } = props;
        
  return (
    <Container text>
      <Header as='h2'>Profile</Header>
      <p>Email: {email}</p>
      <Button onClick={updatePassword}>Update Password</Button>
      <Button onClick={logout}>Logout</Button>
      <Button onClick={deleteAccount} negative>Delete Account</Button>
    </Container>
  )
}

export default ProfileView