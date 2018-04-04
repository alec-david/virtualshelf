import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { filterMovie, searchMovie } from '../../actions/movie';

import FilterBookDropdown from '../../components/books/FilterBookDropdown';
import SearchMovies from '../../components/movies/SearchMovies';

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
    return (
      <Grid verticalAlign='middle'>
        <Grid.Row columns={1}>
          <Grid.Column >
            <SearchMovies
              search={this.state.search}
              handleSearch={this.handleSearch}
            />
            <br /><br />
            <FilterBookDropdown
              options={options}
              handleFilter={this.handleFilter}
              filter={this.state}
              toggleFilterDirection={this.toggleFilterDirection}
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