import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { filterBook, searchBook } from '../../actions/index';

import FilterBookDropdown from '../../components/books/FilterBookDropdown';
import SearchBooks from '../../components/books/SearchBooks';

const options = [
  { key: 'dateRead', value: 'dateRead', text: 'Date Read' },
  { key: 'rating', value: 'rating', text: 'Rating' },
  { key: 'title', value: 'title', text: 'Title' },
  { key: 'author', value: 'author', text: 'Author' },
];
const DESC = 'DESC';
const ASC = 'ASC';

const defaultState = {
  option: 'Filter Books',
  filterDirection: DESC,
  search: ''
}

class FilterBook extends Component {

  state = defaultState;

  handleFilter = (e, val) => {
    this.setState({
      option: val.text
    }, () => {
      this.props.dispatch(filterBook(this.state));
    })
  }

  handleSearch = (e, { name, value }) => {
    this.setState({
      [name]: value
    }, () => {
      this.props.dispatch(searchBook(this.state));
    })
  }

  toggleFilterDirection = () => {
    this.setState({
      filterDirection: (this.state.filterDirection === DESC ? ASC : DESC)
    }, () => {
      this.props.dispatch(filterBook(this.state));
    })
  }

  render() {
    return (
      <Grid verticalAlign='middle'>
        <Grid.Row columns={1}>
          <Grid.Column >
            <SearchBooks
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

export default connect(mapStateToProps)(FilterBook);