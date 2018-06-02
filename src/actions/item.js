export const FILTER_ITEM = 'FILTER_ITEM';
export const SEARCH_ITEM = 'SEARCH_ITEM';
export const LOAD_MORE_ITEMS = 'LOAD_MORE_ITEMS';

export const defaultSearchFilter = {
  option: 'date',
  optionText: 'Date',
  filterDirection: 'DESC',
  search: ''
};

export const filterItem = filter => {
  return {
    ...filter,
    type: FILTER_ITEM
  };
};

export const searchItem = search => {
  return {
    ...search,
    type: SEARCH_ITEM
  };
};

export const loadMoreItems = () => {
  return {
    type: LOAD_MORE_ITEMS
  };
};
