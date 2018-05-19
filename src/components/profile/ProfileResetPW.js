import React from 'react';
import { Form, Button, Container, Header, Message, Icon } from 'semantic-ui-react';

const ProfileRestPW = props => {
  const { email, state, handleChange, resetPassword, cancel } = props;

  const criteriaIcon =
    state.newPassword.length < 8 ? (
      <div>
        <Icon name="x" color="red" />
        <span>Password must be at least 8 characters</span>
      </div>
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
    <div>
      <Form.Input
        label="Old Password"
        type="password"
        name="oldPassword"
        value={state.oldPassword}
        onChange={handleChange}
        autoFocus={true}
        required
      />
      <Form.Input
        label="New Password"
        type="password"
        name="newPassword"
        value={state.newPassword}
        onChange={handleChange}
        required
      />
      {criteriaIcon}
      <Form.Input
        label="Re-enter Password"
        type="password"
        name="reEnterNewPassword"
        value={state.reEnterNewPassword}
        onChange={handleChange}
        required
      />
      {pwMatchIcon}
      <br />
      <Button type="submit" primary>
        Update
      </Button>
      <Button type="button" onClick={cancel.bind(this, 'reset')}>
        Cancel
      </Button>
    </div>
  );

  const form = !state.error ? (
    <Form onSubmit={resetPassword}>{inputs}</Form>
  ) : (
    <Form onSubmit={resetPassword} error>
      <Message error header={state.error} />
      {inputs}
    </Form>
  );

  return (
    <Container text>
      <Header as="h2">Update Password for {email}</Header>
      {form}
    </Container>
  );
};

export default ProfileRestPW;
