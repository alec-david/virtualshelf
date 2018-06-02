import React from 'react';
import { Button, Card, Form, Rating } from 'semantic-ui-react';
import DatePicker from '../util/DatePicker';

const BookEdit = props => {
  const {
    book,
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
            size="tiny"
            value={book.title}
            onChange={handleChange}
            autoFocus={true}
            required
          />
          <Form.Input
            label="Author"
            type="text"
            name="author"
            size="tiny"
            value={book.author}
            onChange={handleChange}
            required
          />
          <Form.TextArea
            label="Brief Review/Description"
            name="description"
            value={book.description}
            onChange={handleChange}
          />
          <DatePicker
            date={book.editDate}
            focus={book.focus}
            handleDateChange={handleDateChange}
            toggleFocus={toggleFocus}
            disableFutureDays={disableFutureDays}
            label="Date Read"
          />
          <Rating
            maxRating={5}
            icon="star"
            size="large"
            rating={book.rating}
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

export default BookEdit;
