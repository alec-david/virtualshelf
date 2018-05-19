import React from 'react';
import { Button, Form, Message, Container, Grid } from 'semantic-ui-react';

const LoginForm = props => {
  const { handleSubmit, handleChange, forgotPassword, formVals } = props;

  const inputs = (
    <div>
      <Form.Input
        label="Email"
        type="email"
        name="email"
        value={formVals.email}
        onChange={handleChange}
        autoFocus={true}
        required
      />
      <Form.Input
        label="Password"
        type="password"
        name="password"
        value={formVals.password}
        onChange={handleChange}
        required
      />
      <Button type="submit">Login</Button>
      <Button onClick={forgotPassword} floated="right" basic={true}>
        Forgot Password?
      </Button>
    </div>
  );

  const form = !formVals.errorMsg ? (
    <Form
      onSubmit={() => {
        handleSubmit();
      }}
    >
      {inputs}
    </Form>
  ) : (
    <Form
      onSubmit={() => {
        handleSubmit();
      }}
      error
    >
      <Message error header={formVals.errorMsg} />
      {inputs}
    </Form>
  );

  return (
    <Container>
      <Grid>
        <Grid.Row centered>
          <Grid.Column width={6}>{form}</Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default LoginForm;
