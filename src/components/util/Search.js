import React from 'react';
import { Input } from 'semantic-ui-react';

const Search = (props) => {

  const {
    search,
    handleSearch,
    placeholder
  } = props;

  return (
    <Input
      icon='search'
      iconPosition='left'
      placeholder={placeholder}
      name='search'
      value={search}
      onChange={handleSearch}
    />
  )
}

export default Search;