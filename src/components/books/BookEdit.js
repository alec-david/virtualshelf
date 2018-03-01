import React, { Component } from 'react';
import { Button, Card, Form, Rating } from 'semantic-ui-react';

class BookEdit extends Component {
  render() {
    const { book, saveEdit, cancelEdit, handleChange } = this.props;
    const formDate = new Date(book.date_read).toISOString().split('T')[0];

    return (
      <Card>
        <Card.Content>
          <Form>
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
              value={formDate}
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
          </Form>
        </Card.Content>
        <Card.Content extra>
          <Button
            basic
            compact
            size='mini'
            floated='left'
            color='red'
            onClick={cancelEdit.bind(this, book.id)}
          >
            Cancel
          </Button>
          <Button
            basic
            compact
            size='mini'
            floated='right'
            color='green'
            onClick={saveEdit.bind(this, book)}
          >
            Save
          </Button>
        </Card.Content>
      </Card>
    );
  }
}

export default BookEdit;
