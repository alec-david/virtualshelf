import React from 'react';
import { Button, Form, Message, Container, Grid } from 'semantic-ui-react';

const ResetPasswordEmailForm = props => {
  const { handleSubmit, handleChange, formVals } = props;

  const inputs = (
    <div>
      <Form.Input
        label="Email"
        type="email"
        name="email"
        value={formVals.email}
        onChange={handleChange}
        required
      />
      <Button type="submit">Send Password Reset Email</Button>
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

export default ResetPasswordEmailForm;
