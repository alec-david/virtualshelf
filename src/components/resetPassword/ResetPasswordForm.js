import React from 'react';
import { Button, Form, Message, Container, Grid, Icon } from 'semantic-ui-react';

const ResetPasswordForm = props => {
  const { handleSubmit, handleChange, formVals } = props;

  const inputs = (
    <div>
      <Form.Input
        label="New Password"
        type="password"
        name="newPassword"
        value={formVals.newPassword}
        onChange={handleChange}
        autoFocus={true}
        required
      />
      <Form.Input
        label="Re-enter New Password"
        type="password"
        name="reEnterPassword"
        value={formVals.reEnterPassword}
        onChange={handleChange}
        required
      />
      <Button type="submit">Reset Password</Button>
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

  const criteriaIcon =
    formVals.newPassword.length < 8 ? (
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

export default ResetPasswordForm;
