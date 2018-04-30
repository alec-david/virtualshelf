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
  { key: 'director', value: 'director', text: 'Director' },
];
const DESC = 'DESC';
const ASC = 'ASC';

const defaultState = {
  option: 'date',
  optionText: 'Date Watched',
  filterDirection: DESC,
  search: ''
}

class FilterMovie extends Component {

  state = defaultState;

  handleFilter = (e, val) => {
    this.setState({
      option: val.value,
      optionText: val.text
    }, () => {
      this.dispatchFilterAction();
    })
  }

  handleSearch = (e, { name, value }) => {
    this.setState({
      [name]: value
    }, () => {
      this.dispatchSearchAction();
    })
  }

  toggleFilterDirection = () => {
    this.setState({
      filterDirection: (this.state.filterDirection === DESC ? ASC : DESC)
    }, () => {
      this.dispatchFilterAction();
    })
  }

  componentDidMount = () => {
    const item = this.props.state.items;
    if (item.filter !== defaultSearchFilter.filter ||
      item.direction !== defaultSearchFilter.filterDirection ||
      item.search !== defaultSearchFilter.search) {

      this.dispatchFilterAction();
      this.dispatchSearchAction();
    }
  }

  dispatchFilterAction = () => {
    this.props.dispatch(filterMovie(this.state));
    this.props.dispatch(filterItem(this.state));
  }

  dispatchSearchAction = () => {
    this.props.dispatch(searchMovie(this.state));
    this.props.dispatch(searchItem(this.state));
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