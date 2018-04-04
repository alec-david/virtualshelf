import React from 'react';
import { Input } from 'semantic-ui-react';

const SearchMovies = (props) => {

  const { search, handleSearch } = props;

  return (
    <Input
      icon='search'
      iconPosition='left'
      placeholder='Search movies...'
      name='search'
      value={search}
      onChange={handleSearch}
    />
  )
}

export default SearchMovies;