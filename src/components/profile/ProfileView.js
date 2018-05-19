import React from 'react';
import { Button, Container, Header, Icon } from 'semantic-ui-react';

const ProfileView = props => {
  const { user, updatePassword, logout, deleteAccount, resendVerificationEmail } = props;

  const verificationStatus = user.verified ? (
    <span>
      <Icon name="check circle" color="green" /> Verified
    </span>
  ) : (
    <span>
      <Icon name="x" color="red" />Not Verified
    </span>
  );

  const resendVerifyEmail = (
    <div>
      <Button onClick={resendVerificationEmail}>Resend Verification Email</Button>
      <br />
      <br />
    </div>
  );

  return (
    <Container text>
      <Header as="h2">Profile</Header>
      <div>
        <p>
          Email: {user.email} ({verificationStatus})
        </p>
      </div>
      <br />
      {user.verified ? '' : resendVerifyEmail}
      <Button onClick={updatePassword}>Update Password</Button>
      <Button onClick={logout}>Logout</Button>
      <Button onClick={deleteAccount} negative>
        Delete Account
      </Button>
    </Container>
  );
};

export default ProfileView;
