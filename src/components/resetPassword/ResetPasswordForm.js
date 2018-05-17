import React from 'react';
import { Button, Form, Message, Container, Grid } from 'semantic-ui-react';

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

export default ResetPasswordForm;
