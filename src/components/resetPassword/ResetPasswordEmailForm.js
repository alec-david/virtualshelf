import React from 'react';
import { Button, Form, Message, Grid, Segment, Header } from 'semantic-ui-react';

const ResetPasswordEmailForm = props => {
  const { handleSubmit, handleChange, cancel, formVals } = props;

  const inputs = (
    <Segment.Group raised>
      <Segment>
        <Form.Input
          fluid
          icon="user"
          iconPosition="left"
          placeholder="E-mail address"
          type="email"
          name="email"
          value={formVals.email}
          onChange={handleChange}
          autoFocus
          required
        />
      </Segment>
      <Segment attached="top" clearing basic>
        <Button type="submit" color="blue" floated="left" size="medium">
          Send Password Reset Email
        </Button>
        <Button onClick={cancel} color="blue" floated="right" size="medium" basic>
          Cancel
        </Button>
      </Segment>
    </Segment.Group>
  );

  const form = !formVals.errorMsg ? (
    <Form onSubmit={handleSubmit}>{inputs}</Form>
  ) : (
    <Form onSubmit={handleSubmit} error>
      <Message error>{formVals.errorMsg}</Message>
      {inputs}
    </Form>
  );

  return (
    <div>
      <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="blue" textAlign="center">
            Reset Password
          </Header>
          {form}
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default ResetPasswordEmailForm;
