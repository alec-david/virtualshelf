import React from 'react';
import { Button, Form, Message, Grid, Segment, Header, Icon } from 'semantic-ui-react';

const RegisterForm = props => {
  const { handleSubmit, handleChange, formVals, loginLink } = props;

  const criteriaIcon =
    formVals.password.length === 0 ? (
      <div />
    ) : formVals.password.length < 8 ? (
      <Icon name="x" color="red" />
    ) : (
      <Icon name="check circle" color="green" />
    );

  const pwMatchIcon =
    formVals.reEnterPassword.length < 8 ? (
      <div />
    ) : formVals.password === formVals.reEnterPassword ? (
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
            </Grid.Column>
            <Grid.Column width={1} />
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column width={14}>
              <Form.Input
                icon="lock"
                iconPosition="left"
                placeholder="Password (minimum 8 characters)"
                type="password"
                name="password"
                value={formVals.password}
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
      <Message error>
        <span>
          <b>{formVals.errorMsg}</b>
        </span>
        <br />
        <span>{formVals.errorBody}</span>
      </Message>
      {inputs}
    </Form>
  );

  return (
    <div>
      <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="blue" textAlign="center">
            Register
          </Header>
          {form}
          <Message>
            Already have an account?{' '}
            <a onClick={loginLink} style={{ cursor: 'pointer' }}>
              Login
            </a>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default RegisterForm;
