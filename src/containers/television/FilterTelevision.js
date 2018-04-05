import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { filterTelevision, searchTelevision } from '../../actions/television';

import FilterBookDropdown from '../../components/books/FilterBookDropdown';
import SearchTelevision from '../../components/television/SearchTelevision';

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

class FilterTelevision extends Component {

  state = defaultState;

  handleFilter = (e, val) => {
    this.setState({
      option: val.text
    }, () => {
      this.props.dispatch(filterTelevision(this.state));
    })
  }

  handleSearch = (e, { name, value }) => {
    this.setState({
      [name]: value
    }, () => {
      this.props.dispatch(searchTelevision(this.state));
    })
  }

  toggleFilterDirection = () => {
    this.setState({
      filterDirection: (this.state.filterDirection === DESC ? ASC : DESC)
    }, () => {
      this.props.dispatch(filterTelevision(this.state));
    })
  }

  render() {
    return (
      <Grid verticalAlign='middle'>
        <Grid.Row columns={1}>
          <Grid.Column >
            <SearchTelevision
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

export default connect(mapStateToProps)(FilterTelevision);