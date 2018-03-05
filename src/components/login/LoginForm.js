import React from 'react';
import { Button, Form, Message, Container, Grid } from 'semantic-ui-react';

const LoginForm = (props) => {
  const { handleSubmit, handleChange, formVals } = props;
  const errorMsg = formVals.errorMsg

  if (!errorMsg) {
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
                <Button type='submit'>Login</Button>
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
                  header={errorMsg}
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
                <Button type='submit'>Login</Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

export default LoginForm