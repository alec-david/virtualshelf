import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { filterBook, searchBook } from '../../actions/book';
import { filterMovie, searchMovie } from '../../actions/movie';
import { filterTelevision, searchTelevision } from '../../actions/television';
import { filterItem, searchItem, defaultSearchFilter } from '../../actions/item';

import FilterDropdown from '../../components/util/FilterDropdown';
import Search from '../../components/util/Search';

const options = [
  { key: 'date', value: 'date', text: 'Date' },
  { key: 'rating', value: 'rating', text: 'Rating' },
  { key: 'title', value: 'title', text: 'Title' }
];
const DESC = 'DESC';
const ASC = 'ASC';

const defaultState = {
  option: 'date',
  optionText: 'Date',
  filterDirection: DESC,
  search: ''
};

class FilterMain extends Component {
  state = defaultState;

  handleFilter = (e, val) => {
    this.setState(
      {
        option: val.value,
        optionText: val.text
      },
      () => {
        this.dispatchFilterAction();
      }
    );
  };

  handleSearch = (e, { name, value }) => {
    this.setState(
      {
        [name]: value
      },
      () => {
        this.dispatchSearchAction();
      }
    );
  };

  toggleFilterDirection = () => {
    this.setState(
      {
        filterDirection: this.state.filterDirection === DESC ? ASC : DESC
      },
      () => {
        this.dispatchFilterAction();
      }
    );
  };

  componentDidMount = () => {
    const item = this.props.state.items;
    if (
      item.filter !== defaultSearchFilter.option ||
      item.direction !== defaultSearchFilter.filterDirection ||
      item.search !== defaultSearchFilter.search
    ) {
      this.dispatchFilterAction();
      this.dispatchSearchAction();
    }
  };

  dispatchFilterAction = () => {
    this.props.dispatch(filterBook(this.state));
    this.props.dispatch(filterMovie(this.state));
    this.props.dispatch(filterTelevision(this.state));
    this.props.dispatch(filterItem(this.state));
  };

  dispatchSearchAction = () => {
    this.props.dispatch(searchBook(this.state));
    this.props.dispatch(searchMovie(this.state));
    this.props.dispatch(searchTelevision(this.state));
    this.props.dispatch(searchItem(this.state));
  };

  itemsExist = () => {
    const { user, books, movies, television } = this.props.state;
    return (
      user.hydratedBooks &&
      user.hydratedMovies &&
      user.hydratedTelevision &&
      (books.bookCount || movies.movieCount || television.televisionCount)
    );
  };

  render() {
    const filterDirection = this.state.filterDirection === 'DESC' ? 'chevron down' : 'chevron up';
    if (this.itemsExist()) {
      return (
        <Grid verticalAlign="middle">
          <Grid.Row columns={1}>
            <Grid.Column>
              <Search
                search={this.state.search}
                handleSearch={this.handleSearch}
                placeholder="Search Items..."
              />
              <br />
              <br />
              <FilterDropdown
                options={options}
                handleFilter={this.handleFilter}
                filter={this.state}
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

export default connect(mapStateToProps)(FilterMain);
