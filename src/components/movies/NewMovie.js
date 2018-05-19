import React from 'react';
import { Button, Card, Form, Rating } from 'semantic-ui-react';

const textAreaStyle = {
  fontSize: '.78571429em'
};

const NewMovie = props => {
  const { movie, cancel, handleChange, handleSubmit } = props;
  const currentDate = new Date().toISOString().split('T')[0];

  return (
    <Card>
      <Card.Content>
        <Form>
          <Form.Input
            label="Title"
            type="text"
            name="title"
            size="mini"
            value={movie.title}
            onChange={handleChange}
            autoFocus={true}
            required
          />
          <Form.Input
            label="Director"
            type="text"
            name="director"
            size="mini"
            value={movie.director}
            onChange={handleChange}
          />
          <Form.TextArea
            label="Brief Review/Description"
            name="description"
            style={textAreaStyle}
            value={movie.description}
            onChange={handleChange}
          />
          <Form.Input
            label="Date Watched"
            type="date"
            name="date"
            size="mini"
            max={currentDate}
            value={movie.date}
            onChange={handleChange}
            required
          />
          <Rating
            maxRating={5}
            icon="star"
            size="large"
            rating={movie.rating}
            onRate={(e, vals) => {
              handleChange(e, { name: 'rating', value: vals.rating });
            }}
          />
        </Form>
      </Card.Content>
      <Card.Content extra>
        <Button basic compact size="mini" floated="left" color="red" onClick={cancel}>
          Cancel
        </Button>
        <Button basic compact size="mini" floated="right" color="green" onClick={handleSubmit}>
          Add
        </Button>
      </Card.Content>
    </Card>
  );
};

export default NewMovie;
