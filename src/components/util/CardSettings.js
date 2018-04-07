import React from 'react';
import { Dropdown } from 'semantic-ui-react';

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

const CardSettings = (props) => {
  const { email, handleSettings } = props;

  let options = optionsLoggedOut;
  if (email) {
    options = optionsLoggedIn;
  }

  return (
    <Dropdown
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
  )
}

export default CardSettings;