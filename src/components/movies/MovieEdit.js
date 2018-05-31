import React from 'react';
import { Button, Card, Form, Rating } from 'semantic-ui-react';
import DatePicker from '../util/DatePicker';

const textAreaStyle = {
  fontSize: '.78571429em'
};

const MovieEdit = props => {
  const {
    movie,
    saveEdit,
    cancelEdit,
    handleChange,
    handleDateChange,
    toggleFocus,
    disableFutureDays
  } = props;

  return (
    <Card>
      <Card.Content>
        <Form size="large">
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
          <DatePicker
            date={movie.editDate}
            focus={movie.focus}
            handleDateChange={handleDateChange}
            toggleFocus={toggleFocus}
            disableFutureDays={disableFutureDays}
            label="Date Watched"
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
        <Button
          basic
          compact
          size="medium"
          floated="left"
          color="red"
          onClick={cancelEdit.bind(this)}
        >
          Cancel
        </Button>
        <Button
          basic
          compact
          size="medium"
          floated="right"
          color="green"
          onClick={saveEdit.bind(this)}
        >
          Save
        </Button>
      </Card.Content>
    </Card>
  );
};

export default MovieEdit;
