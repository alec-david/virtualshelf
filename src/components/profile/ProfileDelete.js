import React from 'react';
import { Form, Button, Header, Message, Segment, Grid } from 'semantic-ui-react';

const ProfileDelete = props => {
  const { email, state, handleChange, confirmDelete, cancel, toggleDeleteItems } = props;

  const inputs = (
    <Segment.Group raised>
      <Segment>
        <Header as="h4">
          Please enter your password to delete the account associated with {email}.
        </Header>
        <Form.Input
          fluid
          icon="lock"
          iconPosition="left"
          placeholder="Password"
          type="password"
          name="oldPassword"
          value={state.password}
          onChange={handleChange}
          autoFocus={true}
          required
        />
        <Form.Checkbox label="Delete all of your items?" onChange={toggleDeleteItems} />
      </Segment>
      <Segment attached="top" clearing basic>
        <Button type="submit" color="red" floated="left" size="medium">
          Delete
        </Button>
        <Button
          onClick={cancel.bind(this, 'delete')}
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
    <Form onSubmit={confirmDelete}>{inputs}</Form>
  ) : (
    <Form onSubmit={confirmDelete} error>
      <Message error>{state.error}</Message>
      {inputs}
    </Form>
  );

  return (
    <div>
      <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="blue" textAlign="center">
            Confirm Account Deletion
          </Header>
          {form}
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default ProfileDelete;
