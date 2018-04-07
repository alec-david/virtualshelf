import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { filterMovie, searchMovie } from '../../actions/movie';

import FilterDropdown from '../../components/util/FilterDropdown';
import Search from '../../components/util/Search';

const options = [
  { key: 'dateWatched', value: 'dateWatched', text: 'Date Watched' },
  { key: 'rating', value: 'rating', text: 'Rating' },
  { key: 'title', value: 'title', text: 'Title' },
  { key: 'director', value: 'director', text: 'Director' },
];
const DESC = 'DESC';
const ASC = 'ASC';

const defaultState = {
  option: 'Date Watched',
  filterDirection: DESC,
  search: ''
}

class FilterMovie extends Component {

  state = defaultState;

  handleFilter = (e, val) => {
    this.setState({
      option: val.text
    }, () => {
      this.props.dispatch(filterMovie(this.state));
    })
  }

  handleSearch = (e, { name, value }) => {
    this.setState({
      [name]: value
    }, () => {
      this.props.dispatch(searchMovie(this.state));
    })
  }

  toggleFilterDirection = () => {
    this.setState({
      filterDirection: (this.state.filterDirection === DESC ? ASC : DESC)
    }, () => {
      this.props.dispatch(filterMovie(this.state));
    })
  }

  render() {
    const filterDirection = this.state.filterDirection === 'DESC' ? 'chevron down' : 'chevron up';
    return (
      <Grid verticalAlign='middle'>
        <Grid.Row columns={1}>
          <Grid.Column >
            <Search
              search={this.state.search}
              handleSearch={this.handleSearch}
              placeholder='Search Movies...'
            />
            <br /><br />
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
    )
  }
}

const mapStateToProps = state => {
  return { state };
};

export default connect(mapStateToProps)(FilterMovie);