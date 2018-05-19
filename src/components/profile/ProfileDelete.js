import React from 'react';
import { Form, Button, Container, Header, Message } from 'semantic-ui-react';

const ProfileDelete = props => {
  const { email, state, handleChange, confirmDelete, cancel, toggleDeleteItems } = props;

  const inputs = (
    <div>
      <Form.Input
        label="Password"
        type="password"
        name="oldPassword"
        value={state.password}
        onChange={handleChange}
        autoFocus={true}
        required
      />
      <Form.Checkbox label="Delete all of your items?" onChange={toggleDeleteItems} />
      <Button type="submit" negative>
        Delete
      </Button>
      <Button type="button" onClick={cancel.bind(this, 'delete')}>
        Cancel
      </Button>
    </div>
  );

  const form = !state.error ? (
    <Form onSubmit={confirmDelete}>{inputs}</Form>
  ) : (
    <Form onSubmit={confirmDelete} error>
      <Message error header={state.error} />
      {inputs}
    </Form>
  );

  return (
    <Container text>
      <Header as="h2">Confirm Account Deletion</Header>
      <p>Please enter your password to delete the account associated with {email}.</p>
      {form}
    </Container>
  );
};

export default ProfileDelete;
