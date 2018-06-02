import React from 'react';
import { Button, Card, Form, Rating } from 'semantic-ui-react';
import DatePicker from '../util/DatePicker';

const TelevisionEdit = props => {
  const {
    television,
    saveEdit,
    cancelEdit,
    handleChange,
    handleDateChange,
    toggleFocus,
    disableFutureDays
  } = props;
  if (!television.episode) {
    television.episode = '';
  }

  return (
    <Card>
      <Card.Content>
        <Form size="large">
          <Form.Input
            label="Title"
            type="text"
            name="title"
            size="tiny"
            value={television.title}
            onChange={handleChange}
            autoFocus={true}
            required
          />
          <Form.Group widths="equal">
            <Form.Input
              label="Season"
              type="number"
              name="season"
              size="tiny"
              value={television.season}
              onChange={handleChange}
              required
              fluid
            />
            <Form.Input
              label="Episode"
              type="number"
              name="episode"
              size="tiny"
              value={television.episode}
              onChange={handleChange}
              fluid
            />
          </Form.Group>
          <Form.TextArea
            label="Brief Review/Description"
            name="description"
            value={television.description}
            onChange={handleChange}
          />
          <DatePicker
            date={television.editDate}
            focus={television.focus}
            handleDateChange={handleDateChange}
            toggleFocus={toggleFocus}
            disableFutureDays={disableFutureDays}
            label="Date Watched"
          />
          <Rating
            maxRating={5}
            icon="star"
            size="large"
            rating={television.rating}
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

export default TelevisionEdit;
