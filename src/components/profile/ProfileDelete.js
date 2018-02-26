import React from 'react';
import { Form,
         Button,
         Container,
         Header,
         Message 
       } from 'semantic-ui-react';

const ProfileDelete = (props) => {
  const { email,
          password,
          handleChange,
          confirmDelete,
          cancel,
          error
        } = props;
  
  if (!error) {
    return (
      <Container text>
        <Header as='h2'>Confirm Account Deletion</Header>
        <p>Please enter your password to delete the account associated with {email}.</p>
        <Form onSubmit={confirmDelete}>
          <Form.Input
            label='Password'
            type='password'
            name='oldPassword'
            value={password}
            onChange={handleChange}
            required
          />
          <Button type='submit' negative>Delete</Button>
          <Button type='button' onClick={cancel.bind(this,'delete')}>Cancel</Button>
        </Form>
      </Container>
    )
  } else {
    return (
      <Container text>
        <Header as='h2'>Confirm Account Deletion</Header>
        <p>Please enter your password to delete the account associated with {email}.</p>
        <Form onSubmit={confirmDelete} error>
          <Message
            error
            header={error}
          />
          <Form.Input
            label='Password'
            type='password'
            name='oldPassword'
            value={password}
            onChange={handleChange}
            required
          />
          <Button type='submit' negative>Delete</Button>
          <Button type='button' onClick={cancel.bind(this,'delete')}>Cancel</Button>
        </Form>
      </Container>
    )
  }
}

export default ProfileDelete;