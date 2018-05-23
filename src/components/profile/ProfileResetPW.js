import React from 'react';
import { Form, Button, Header, Message, Icon, Segment, Grid } from 'semantic-ui-react';

const ProfileRestPW = props => {
  const { email, state, handleChange, resetPassword, cancel } = props;

  const criteriaIcon =
    state.newPassword.length === 0 ? (
      <div />
    ) : state.newPassword.length < 8 ? (
      <Icon name="x" color="red" />
    ) : (
      <Icon name="check circle" color="green" />
    );

  const pwMatchIcon =
    state.reEnterNewPassword.length < 8 ? (
      <div />
    ) : state.newPassword === state.reEnterNewPassword ? (
      <Icon name="check circle" color="green" />
    ) : (
      <Icon name="x" color="red" />
    );

  const inputs = (
    <Segment.Group raised>
      <Segment>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column width={14}>
              <Form.Input
                icon="lock"
                iconPosition="left"
                placeholder="Old Password"
                type="password"
                name="oldPassword"
                value={state.oldPassword}
                onChange={handleChange}
                required
              />
            </Grid.Column>
            <Grid.Column width={1} floated="left" verticalAlign="middle" />
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column width={14}>
              <Form.Input
                icon="lock"
                iconPosition="left"
                placeholder="New Password (minimum 8 characters)"
                type="password"
                name="newPassword"
                value={state.newPassword}
                onChange={handleChange}
                required
              />
            </Grid.Column>
            <Grid.Column width={1} floated="left" verticalAlign="middle">
              {criteriaIcon}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column width={14}>
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Re-enter New Password"
                type="password"
                name="reEnterNewPassword"
                value={state.reEnterNewPassword}
                onChange={handleChange}
                required
              />
            </Grid.Column>
            <Grid.Column width={1} floated="left" verticalAlign="middle">
              {pwMatchIcon}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment attached="top" clearing basic>
        <Button type="submit" color="blue" floated="left" size="medium">
          Update
        </Button>
        <Button
          onClick={cancel.bind(this, 'reset')}
          color="blue"
          floated="right"
          size="medium"
          basic
        >
          Cancel
        </Button>
      </Segment>
    </Segment.Group>
  );

  const form = !state.error ? (
    <Form onSubmit={resetPassword}>{inputs}</Form>
  ) : (
    <Form onSubmit={resetPassword} error>
      <Message error>{state.error}</Message>
      {inputs}
    </Form>
  );

  return (
    <div>
      <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="blue" textAlign="center">
            Update Password for {email}
          </Header>
          {form}
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default ProfileRestPW;
