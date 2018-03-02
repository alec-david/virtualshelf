import React from 'react';
import { Card, Dropdown, Rating } from 'semantic-ui-react';

const options = [
  { key: 1, text: 'Edit', value: 'Edit' },
  { key: 2, text: 'Hide', value: 'Hide' },
  { key: 3, text: 'Delete', value: 'Delete' },
];

const ellipsisStyle = {
  marginRight: -10 + 'px'
}

const BookCardContent = (props) => {
  const { book, handleSettings, email } = props;
  const formattedDate = new Date(book.date_read).toLocaleDateString();

  let settings;
  if (email) {
    settings = <Dropdown
      icon='ellipsis vertical'
      className='icon right floated'
      style={ellipsisStyle}
    >
      <Dropdown.Menu>
        {options.map(option =>
          <Dropdown.Item
            key={option.value}
            onClick={handleSettings}
            {...option}
          />
        )}
      </Dropdown.Menu>
    </Dropdown>
  }

  return (
    <Card.Content>
      <Card.Header>
        {settings}
        {book.title}
      </Card.Header>
      <Card.Meta>
        {book.author} <br />
        {formattedDate} - {' '}
        <Rating
          maxRating={5}
          icon='star'
          rating={book.rating}
          disabled
          size='mini'
        />
      </Card.Meta>
      <Card.Description>
        {book.description}
      </Card.Description>
    </Card.Content>
  )
}

export default BookCardContent;