import React from 'react';
import { Button, Form, Message } from 'semantic-ui-react';

const LoginForm = (props) => {
  const { handleSubmit, handleChange, errorMsg } = props;
  
  if (!errorMsg) {
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
        <Button type='submit'>Login</Button>
      </Form>
    )
  } else {
    return (
      <Form 
        onSubmit={() => { handleSubmit() }} 
        error
      >
        <Message 
          compact
          error
          header="Error Occurred"
          content={errorMsg}
        />
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
        <Button type='submit'>Login</Button>
      </Form>
    )
  }
}

export default LoginForm