import React from 'react';
import { Button, Card, Form, Rating } from 'semantic-ui-react';

const textAreaStyle = {
  fontSize: '.78571429em'
};

const TelevisionEdit = props => {
  const { television, saveEdit, cancelEdit, handleChange } = props;
  let formDate;
  try {
    formDate = new Date(television.date).toISOString().split('T')[0];
  } catch (e) {
    formDate = '';
  }
  if (!television.episode) {
    television.episode = '';
  }
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
              size="mini"
              value={television.season}
              onChange={handleChange}
              required
              fluid
            />
            <Form.Input
              label="Episode"
              type="number"
              name="episode"
              size="mini"
              value={television.episode}
              onChange={handleChange}
              fluid
            />
          </Form.Group>
          <Form.TextArea
            label="Brief Review/Description"
            name="description"
            style={textAreaStyle}
            value={television.description}
            onChange={handleChange}
          />
          <Form.Input
            label="Date Watched"
            type="date"
            name="date"
            size="mini"
            max={currentDate}
            value={formDate}
            onChange={handleChange}
            required
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
          size="mini"
          floated="left"
          color="red"
          onClick={cancelEdit.bind(this)}
        >
          Cancel
        </Button>
        <Button
          basic
          compact
          size="mini"
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
