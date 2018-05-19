import React from 'react';
import { Button, Form, Message, Container, Grid, Icon } from 'semantic-ui-react';

const RegisterForm = props => {
  const { handleChange, handleSubmit, formVals } = props;

  const inputs = (
    <div>
      <Form.Input
        label="Email"
        type="email"
        name="email"
        value={formVals.email}
        onChange={handleChange}
        autoFocus={!formVals.errorMsg}
        required
      />
      <Form.Input
        label="Password"
        type="password"
        name="password"
        value={formVals.password}
        onChange={handleChange}
        autoFocus={!!formVals.errorMsg}
        required
      />
      <Form.Input
        label="Re-enter Password"
        type="password"
        name="reEnterPassword"
        value={formVals.reEnterPassword}
        onChange={handleChange}
        required
      />
      <Button type="submit">Register</Button>
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
      <Message error header={formVals.errorMsg} content={formVals.errorBody} />
      {inputs}
    </Form>
  );

  const criteriaIcon =
    formVals.password.length < 8 ? (
      <div>
        <Icon name="x" color="red" />
        <span>Password must be at least 8 characters</span>
      </div>
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

  return (
    <Container>
      <Grid>
        <Grid.Row centered>
          <Grid.Column width={6}>{form}</Grid.Column>
          <Grid.Column width={2}>
            <div>{criteriaIcon}</div>
            <div>{pwMatchIcon}</div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default RegisterForm;
