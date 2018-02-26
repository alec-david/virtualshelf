import React from 'react';
import { Form,
  Button,
  Container,
  Header,
  Message 
} from 'semantic-ui-react';

const ProfileRestPW = (props) => {
  const { email,
          state,
          handleChange,
          resetPassword,
          cancel
        } = props;
  if (!state.error) {
    return (
      <Container text>
        <Header as='h2'>Update Password for {email}</Header>
        <Form onSubmit={resetPassword}>
          <Form.Input
            label='Old Password'
            type='password'
            name='oldPassword'
            value={state.oldPassword}
            onChange={handleChange}
            required
          />
          <Form.Input
            label='New Password'
            type='password'
            name='newPassword'
            value={state.newPassword}
            onChange={handleChange}
            required
          />
          <Form.Input
            label='Re-enter Password'
            type='password'
            name='reEnterNewPassword'
            value={state.reEnterNewPassword}
            onChange={handleChange}
            required
          />
          <Button type='submit' primary>Update</Button>
          <Button type='button' onClick={cancel.bind(this,'reset')}>Cancel</Button>
        </Form>
      </Container>
    )
  } else {
    return (
      <Container text>
        <Header as='h2'>Update Password for {email}</Header>
        <Form onSubmit={resetPassword} error>
          <Message
            error
            header={state.error}
          />
          <Form.Input
            label='Old Password'
            type='password'
            name='oldPassword'
            value={state.oldPassword}
            onChange={handleChange}
            required
          />
          <Form.Input
            label='New Password'
            type='password'
            name='newPassword'
            value={state.newPassword}
            onChange={handleChange}
            required
          />
          <Form.Input
            label='Re-enter Password'
            type='password'
            name='reEnterNewPassword'
            value={state.reEnterNewPassword}
            onChange={handleChange}
            required
          />
          <Button type='submit' primary>Update</Button>
          <Button type='button' onClick={cancel.bind(this,'reset')}>Cancel</Button>
        </Form>
      </Container>
    )
  }
}

export default ProfileRestPW;