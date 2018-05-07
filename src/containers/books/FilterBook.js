import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { filterBook, searchBook } from '../../actions/book';
import { filterItem, searchItem, defaultSearchFilter } from '../../actions/item';

import FilterDropdown from '../../components/util/FilterDropdown';
import Search from '../../components/util/Search';

const options = [
  { key: 'date', value: 'date', text: 'Date Read' },
  { key: 'rating', value: 'rating', text: 'Rating' },
  { key: 'title', value: 'title', text: 'Title' },
  { key: 'author', value: 'author', text: 'Author' }
];
const DESC = 'DESC';
const ASC = 'ASC';

class FilterBook extends Component {
  handleFilter = (e, val) => {
    const filterObj = {
      option: val.value,
      optionText: val.text,
      filterDirection: this.props.state.books.filterDirection
    };
    this.dispatchFilterAction(filterObj);
  };

  handleSearch = (e, { name, value }) => {
    this.dispatchSearchAction(value);
  };

  toggleFilterDirection = () => {
    const direction = this.props.state.books.filterDirection;
    const filterObj = {
      ...this.props.state.books,
      filterDirection: direction === DESC ? ASC : DESC
    };
    this.dispatchFilterAction(filterObj);
  };

  componentDidMount = () => {
    const { items, user } = this.props.state;
    if (
      user.hydratedBooks &&
      (items.filter !== defaultSearchFilter.option ||
        items.direction !== defaultSearchFilter.filterDirection ||
        items.search !== defaultSearchFilter.search)
    ) {
      defaultSearchFilter.optionText = 'Date Read';
      this.dispatchFilterAction(defaultSearchFilter);
      this.dispatchSearchAction('');
    }
  };

  dispatchFilterAction = filterObj => {
    this.props.dispatch(filterBook(filterObj));
    this.props.dispatch(filterItem(filterObj));
  };

  dispatchSearchAction = search => {
    this.props.dispatch(searchBook({ search }));
    this.props.dispatch(searchItem({ search }));
  };

  booksExist = () => {
    const { user, books } = this.props.state;
    return user.hydratedBooks && books.bookCount;
  };

  render() {
    const { books } = this.props.state;
    const filterDirection = books.filterDirection === 'DESC' ? 'chevron down' : 'chevron up';
    if (this.booksExist()) {
      return (
        <Grid verticalAlign="middle">
          <Grid.Row columns={1}>
            <Grid.Column>
              <Search
                search={books.search}
                handleSearch={this.handleSearch}
                placeholder="Search books..."
              />
              <br />
              <br />
              <FilterDropdown
                options={options}
                handleFilter={this.handleFilter}
                filter={books}
                toggleFilterDirection={this.toggleFilterDirection}
                filterDirection={filterDirection}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
    }
    return <div />;
  }
}

const mapStateToProps = state => {
  return { state };
};

export default connect(mapStateToProps)(FilterBook);
