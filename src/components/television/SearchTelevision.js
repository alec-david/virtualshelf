import React from 'react';
import { Input } from 'semantic-ui-react';

const SearchTelevision = (props) => {

  const { search, handleSearch } = props;

  return (
    <Input
      icon='search'
      iconPosition='left'
      placeholder='Search tv...'
      name='search'
      value={search}
      onChange={handleSearch}
    />
  )
}

export default SearchTelevision;