import React from 'react';
// import { Field } from 'redux-form';
import { Button, Container, Form, Grid, Rating } from 'semantic-ui-react';

const AddBookForm = (props) => {
  const { handleSubmit, handleChange, book } = props;
  return (
    <Container text>
      <Grid>
        <Grid.Row centered>
          <Grid.Column width={6}>
            <Form onSubmit={() => { handleSubmit(this.rating) }}>
              <Form.Input
                label='Title'
                type='text'
                name='title'
                value={book.title}
                onChange={handleChange}
                required
              />
              <Form.Input
                label='Author'
                type='text'
                name='author'
                value={book.author}
                onChange={handleChange}
                required
              />
              <Form.Input
                label='Date Read'
                type='date'
                name='dateRead'
                value={book.dateRead}
                onChange={handleChange}
                required
              />
              <Rating
                maxRating={5}
                icon='star'
                size='huge'
                rating={book.rating}
                onRate={(e, vals) => { handleChange(e, { name: 'rating', value: vals.rating }) }}
              />
              <br /><br />
              <Button type='submit'>Add Book</Button>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default AddBookForm;
