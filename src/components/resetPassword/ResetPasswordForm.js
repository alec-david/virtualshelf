import React from 'react';
import { Button, Form, Message, Grid, Icon, Segment, Header } from 'semantic-ui-react';

const ResetPasswordForm = props => {
  const { handleSubmit, handleChange, formVals } = props;

  const criteriaIcon =
    formVals.newPassword.length === 0 ? (
      <div />
    ) : formVals.newPassword.length < 8 ? (
      <Icon name="x" color="red" />
    ) : (
      <Icon name="check circle" color="green" />
    );

  const pwMatchIcon =
    formVals.reEnterPassword.length < 8 ? (
      <div />
    ) : formVals.newPassword === formVals.reEnterPassword ? (
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
                placeholder="Password (minimum 8 characters)"
                type="password"
                name="newPassword"
                value={formVals.newPassword}
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
                placeholder="Re-enter Password"
                type="password"
                name="reEnterPassword"
                value={formVals.reEnterPassword}
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
        <Button type="submit" color="blue" size="medium">
          Register
        </Button>
      </Segment>
    </Segment.Group>
  );

  const form = !formVals.errorMsg ? (
    <Form size="large" onSubmit={handleSubmit}>
      {inputs}
    </Form>
  ) : (
    <Form size="large" onSubmit={handleSubmit} error>
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

export default ResetPasswordForm;
