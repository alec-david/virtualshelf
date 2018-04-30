import React from 'react';
import { Dropdown, Icon } from 'semantic-ui-react';


const FilterDropdown = (props) => {
  const {
    filter,
    handleFilter,
    toggleFilterDirection,
    options,
    filterDirection
  } = props;

  return (
    <div>
      <Dropdown
        floating
        labeled
        button
        text={filter.optionText}
        icon={null}
      >
        <Dropdown.Menu>
          <Dropdown.Menu scrolling>
            {options
              .filter(option => option.text !== filter.option)
              .map(option =>
                <Dropdown.Item
                  key={option.value}
                  onClick={handleFilter}
                  {...option}
                />
              )}
          </Dropdown.Menu>
        </Dropdown.Menu>
      </Dropdown>
      {' '}
      <Icon
        name={filterDirection}
        onClick={toggleFilterDirection}
        style={{ cursor: 'pointer' }}
      />
    </div>
  );
};

export default FilterDropdown;