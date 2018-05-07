import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { filterMovie, searchMovie } from '../../actions/movie';
import { filterItem, searchItem, defaultSearchFilter } from '../../actions/item';

import FilterDropdown from '../../components/util/FilterDropdown';
import Search from '../../components/util/Search';

const options = [
  { key: 'date', value: 'date', text: 'Date Watched' },
  { key: 'rating', value: 'rating', text: 'Rating' },
  { key: 'title', value: 'title', text: 'Title' },
  { key: 'director', value: 'director', text: 'Director' }
];
const DESC = 'DESC';
const ASC = 'ASC';

class FilterMovie extends Component {
  handleFilter = (e, val) => {
    const filterObj = {
      option: val.value,
      optionText: val.text,
      filterDirection: this.props.state.movies.filterDirection
    };
    this.dispatchFilterAction(filterObj);
  };

  handleSearch = (e, { name, value }) => {
    this.dispatchSearchAction(value);
  };

  toggleFilterDirection = () => {
    const direction = this.props.state.movies.filterDirection;
    const filterObj = {
      ...this.props.state.movies,
      filterDirection: direction === DESC ? ASC : DESC
    };
    this.dispatchFilterAction(filterObj);
  };

  componentDidMount = () => {
    const { items, user } = this.props.state;

    if (
      user.hydratedMovies &&
      (items.filter !== defaultSearchFilter.option ||
        items.direction !== defaultSearchFilter.filterDirection ||
        items.search !== defaultSearchFilter.search)
    ) {
      defaultSearchFilter.optionText = 'Date Watched';
      this.dispatchFilterAction(defaultSearchFilter);
      this.dispatchSearchAction('');
    }
  };

  dispatchFilterAction = filterObj => {
    this.props.dispatch(filterMovie(filterObj));
    this.props.dispatch(filterItem(filterObj));
  };

  dispatchSearchAction = search => {
    this.props.dispatch(searchMovie({ search }));
    this.props.dispatch(searchItem({ search }));
  };

  moviesExist = () => {
    const { user, movies } = this.props.state;
    return user.hydratedMovies && movies.movieCount;
  };

  render() {
    const { movies } = this.props.state;
    const filterDirection = movies.filterDirection === 'DESC' ? 'chevron down' : 'chevron up';
    if (this.moviesExist()) {
      return (
        <Grid verticalAlign="middle">
          <Grid.Row columns={1}>
            <Grid.Column>
              <Search
                search={movies.search}
                handleSearch={this.handleSearch}
                placeholder="Search Movies..."
              />
              <br />
              <br />
              <FilterDropdown
                options={options}
                handleFilter={this.handleFilter}
                filter={movies}
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

export default connect(mapStateToProps)(FilterMovie);
