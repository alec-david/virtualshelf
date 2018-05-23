import React from 'react';
import { Header, Segment, Button, Form, Message, Grid } from 'semantic-ui-react';

const LoginForm = props => {
  const { handleSubmit, handleChange, forgotPassword, formVals, registerLink } = props;

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
        <Form.Input
          fluid
          icon="lock"
          iconPosition="left"
          placeholder="Password"
          type="password"
          name="password"
          value={formVals.password}
          onChange={handleChange}
          required
        />
      </Segment>
      <Segment attached="top" clearing basic>
        <Button type="submit" color="blue" floated="left" size="medium">
          Login
        </Button>
        <Button onClick={forgotPassword} color="blue" floated="right" size="medium" basic>
          Forgot Password?
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
            Login to your account
          </Header>
          {form}
          <Message>
            New to us?{' '}
            <a onClick={registerLink} style={{ cursor: 'pointer' }}>
              Sign Up
            </a>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default LoginForm;
