import React from 'react';
import { Card, Dropdown, Rating } from 'semantic-ui-react';

const optionsLoggedIn = [
  { key: 1, text: 'Edit', value: 'Edit' },
  { key: 2, text: 'Hide', value: 'Hide' },
  { key: 3, text: 'Delete', value: 'Delete' },
];

const optionsLoggedOut = [
  { key: 1, text: 'Hide', value: 'Hide' },
  { key: 2, text: 'Flag', value: 'Flag' }
];

const ellipsisStyle = {
  marginRight: -10 + 'px'
}

const TelevisionCardContent = (props) => {
  const { television, handleSettings, email } = props;
  const formattedDate = new Date(television.date_watched).toLocaleDateString();

  let settings;
  if (email) {
    settings =
      <Dropdown
        icon='ellipsis vertical'
        className='icon right floated'
        style={ellipsisStyle}
      >
        <Dropdown.Menu>
          {optionsLoggedIn.map(option =>
            <Dropdown.Item
              key={option.value}
              onClick={handleSettings}
              {...option}
            />
          )}
        </Dropdown.Menu>
      </Dropdown>
  } else {
    settings =
      <Dropdown
        icon='ellipsis vertical'
        className='icon right floated'
        style={ellipsisStyle}
      >
        <Dropdown.Menu>
          {optionsLoggedOut.map(option =>
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
        {television.title}
      </Card.Header>
      <Card.Meta>
        Season {television.season} { ' ' }
        Episode {television.episode} <br />
        {formattedDate} - {' '}
        <Rating
          maxRating={5}
          icon='star'
          rating={television.rating}
          disabled
          size='mini'
        />
      </Card.Meta>
      <Card.Description>
        {television.description}
      </Card.Description>
    </Card.Content>
  )
}

export default TelevisionCardContent;