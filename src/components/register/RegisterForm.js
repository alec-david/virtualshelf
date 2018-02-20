import React from 'react';
import { Button, Form, Message } from 'semantic-ui-react';

const RegisterForm = (props) => {
  const { handleChange, handleSubmit, passwordsMatch } = props;

  if (passwordsMatch) {
    return (
      <Form onSubmit={() => { handleSubmit() }} >
        <Form.Input
          label='Email'
          type='email'
          width={4}
          name='email'
          value={props.email}
          onChange={handleChange}
          required
        />
        <Form.Input
          label='Password'
          type='password'
          width={4}
          name='password'
          value={props.password}
          onChange={handleChange}
          required
        />
        <Form.Input
          label='Re-enter Password'
          type='password'
          width={4}
          name='reEnterPassword'
          value={props.reEnterPassword}
          onChange={handleChange}
          required
        />
        <Button type='submit'>Register</Button>
      </Form>
    )
  } else {
    return (
      <Form 
        onSubmit={() => { handleSubmit() }} 
        error
      >
        <Form.Input
          label='Email'
          type='email'
          width={4}
          name='email'
          value={props.email}
          onChange={handleChange}
          required
        />
        <Form.Input
          label='Password'
          type='password'
          width={4}
          name='password'
          value={props.password}
          onChange={handleChange}
          required
        />
        <Form.Input
          label='Re-enter Password'
          type='password'
          width={4}
          name='reEnterPassword'
          value={props.reEnterPassword}
          onChange={handleChange}
          required
        />
        <Message
          compact
          error
          header="Passwords Don't Match"
          content='Ensure passwords match before registering.'
        />
        <br/>
        <Button type='submit'>Register</Button>
      </Form>
    )
  }
}

export default RegisterForm;