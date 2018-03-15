import React from 'react';
import { Input } from 'semantic-ui-react';

const SearchBooks = (props) => {

  const { search, handleSearch } = props;

  return (
    <Input
      icon='search'
      iconPosition='left'
      placeholder='Search books...'
      name='search'
      value={search}
      onChange={handleSearch}
    />
  )
}

export default SearchBooks;