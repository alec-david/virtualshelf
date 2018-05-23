import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const optionsLoggedInWithImage = [
  { key: 1, text: 'Edit', value: 'Edit' },
  { key: 2, text: 'Hide', value: 'Hide' },
  { key: 3, text: 'Incorrect Image', value: 'Incorrect Image' },
  { key: 4, text: 'Delete', value: 'Delete' }
];

const optionsLoggedInWithoutImage = [
  { key: 1, text: 'Edit', value: 'Edit' },
  { key: 2, text: 'Hide', value: 'Hide' },
  { key: 3, text: 'Delete', value: 'Delete' }
];

const optionsLoggedOut = [
  { key: 1, text: 'Hide', value: 'Hide' },
  { key: 2, text: 'Flag', value: 'Flag' }
];

const ellipsisStyle = {
  marginRight: -10 + 'px'
};

const CardSettings = props => {
  const { email, handleSettings, item } = props;

  let options = optionsLoggedOut;
  if (email) {
    options = optionsLoggedInWithoutImage;
  }
  if (email && item.image_url) {
    options = optionsLoggedInWithImage;
  }

  return (
    <Dropdown icon="ellipsis vertical" className="icon right floated" style={ellipsisStyle}>
      <Dropdown.Menu>
        {options.map(option => (
          <Dropdown.Item key={option.value} onClick={handleSettings} {...option} />
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CardSettings;
