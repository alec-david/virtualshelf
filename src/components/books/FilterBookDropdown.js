import React from 'react';
import { Dropdown, Icon } from 'semantic-ui-react';


const FilterBookDropdown = (props) => {
  const { 
    filter,
    handleFilter,
    toggleFilterDirection,
    options 
  } = props;
  
  let filterDirection;
  if (filter.filterDirection === 'DESC') {
    filterDirection = 'chevron down';
  } else {
    filterDirection = 'chevron up';
  }
  
  return(
    <div>
      <Dropdown
        floating
        labeled
        button
        text={filter.option}
        icon={null}
      >
        <Dropdown.Menu>
          <Dropdown.Menu scrolling>
            {options.map(option =>
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
        style={{cursor:'pointer'}}
      />
    </div>
  );
};

export default FilterBookDropdown;