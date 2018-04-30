export const FILTER_ITEM = 'FILTER_ITEM';
export const SEARCH_ITEM = 'SEARCH_ITEM';

export const defaultSearchFilter = {
  option: 'date',
  optionText: 'Date',
  filterDirection: 'DESC',
  search: ''
}

export const filterItem = filter => {
  return {
    ...filter,
    type: FILTER_ITEM
  }
}

export const searchItem = search => {
  return {
    ...search,
    type: SEARCH_ITEM
  }
}