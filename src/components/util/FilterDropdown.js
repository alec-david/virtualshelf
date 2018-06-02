import React from 'react';
import { Dropdown, Icon } from 'semantic-ui-react';

const textSize = {
  fontSize: '16px'
};

const FilterDropdown = props => {
  const { filter, handleFilter, toggleFilterDirection, options, filterDirection } = props;

  return (
    <div>
      <Dropdown floating labeled button text={filter.optionText} icon={null} style={textSize}>
        <Dropdown.Menu>
          <Dropdown.Menu scrolling>
            {options
              .filter(option => option.value !== filter.option)
              .map(option => (
                <Dropdown.Item
                  key={option.value}
                  onClick={handleFilter}
                  style={textSize}
                  {...option}
                />
              ))}
          </Dropdown.Menu>
        </Dropdown.Menu>
      </Dropdown>{' '}
      <Icon name={filterDirection} onClick={toggleFilterDirection} style={{ cursor: 'pointer' }} />
    </div>
  );
};

export default FilterDropdown;
