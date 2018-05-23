import React from 'react';
import { Button, Grid, Header, Icon, Segment } from 'semantic-ui-react';

const ProfileView = props => {
  const { user, updatePassword, logout, deleteAccount, resendVerificationEmail } = props;

  const verificationStatus = user.verified ? (
    <span>
      <Icon name="check circle" color="green" /> Verified
    </span>
  ) : (
    <span>
      {' '}
      <Icon name="x" color="red" />Not Verified
    </span>
  );

  const resendVerifyEmail = (
    <div>
      <Button onClick={resendVerificationEmail} color="blue" size="medium">
        Resend Verification Email
      </Button>
      <br />
    </div>
  );

  return (
    <div>
      <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="blue" textAlign="center">
            Profile
          </Header>
          <Segment.Group raised>
            <Segment>
              <Header as="h3">
                Email: {user.email} ({verificationStatus})
              </Header>
              {user.verified ? '' : resendVerifyEmail}
            </Segment>
            <Segment attached="top" clearing basic>
              <Button onClick={updatePassword} color="blue" size="medium">
                Update Password
              </Button>
              <Button onClick={logout} color="grey" size="medium">
                Logout
              </Button>
              <Button onClick={deleteAccount} color="blue" size="medium" negative>
                Delete Account
              </Button>
            </Segment>
          </Segment.Group>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default ProfileView;
