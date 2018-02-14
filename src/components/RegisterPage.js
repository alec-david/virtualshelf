import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react'

// class RegisterPage extends Component {
//   render() {
//     return (
//       <div>Register</div>
//     )
//   }
// }

const RegisterPage = () => {

  const handleSubmit = () => {
    console.log('ye');
  }

  return (
    <Form onSubmit={() => { handleSubmit() }} >
      <Form.Input label='Email' type='email' width={4} required />
      <Form.Input label='Password' type='password' width={4} required />
      <Form.Input label='Re-enter Password' type='password' width={4} required />
      <Button type='submit'>Submit</Button>
    </Form>
  )
}

export default RegisterPage;