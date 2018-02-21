import React from 'react';
import { Button, Form, Message, Container, Grid } from 'semantic-ui-react';

const RegisterForm = (props) => {
  const { handleChange, handleSubmit, formVals } = props;

  if (!formVals.errorMsg) {
    return (
      <Container>
        <Grid>
          <Grid.Row centered>
            <Grid.Column width={6}>
              <Form onSubmit={() => { handleSubmit() }} >
                <Form.Input
                  label='Email'
                  type='email'
                  name='email'
                  value={formVals.email}
                  onChange={handleChange}
                  required
                />
                <Form.Input
                  label='Password'
                  type='password'
                  name='password'
                  value={formVals.password}
                  onChange={handleChange}
                  required
                />
                <Form.Input
                  label='Re-enter Password'
                  type='password'
                  name='reEnterPassword'
                  value={formVals.reEnterPassword}
                  onChange={handleChange}
                  required
                />
                <Button type='submit'>Register</Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  } else {
    return (
      <Container>
        <Grid>
          <Grid.Row centered>
            <Grid.Column width={6}>
              <Form
                onSubmit={() => { handleSubmit() }}
                error
              >
                <Message
                  error
                  header={formVals.errorMsg}
                  content={formVals.errorBody}
                />
                <Form.Input
                  label='Email'
                  type='email'
                  name='email'
                  value={formVals.email}
                  onChange={handleChange}
                  required
                />
                <Form.Input
                  label='Password'
                  type='password'
                  name='password'
                  value={formVals.password}
                  onChange={handleChange}
                  required
                />
                <Form.Input
                  label='Re-enter Password'
                  type='password'
                  name='reEnterPassword'
                  value={formVals.reEnterPassword}
                  onChange={handleChange}
                  required
                />
                <br />
                <Button type='submit'>Register</Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

export default RegisterForm;