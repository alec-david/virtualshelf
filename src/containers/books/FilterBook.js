import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { filterBook } from '../../actions/index';

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

class FilterBook extends Component {

  state = {
    option: 'Filter Books',
    filterDirection: DESC,
    search: ''
  }

  handleFilter = (e, val) => {
    this.setState({
      option: val.text
    })

    this.props.dispatch(filterBook(this.state));
  }

  handleChange = (e, {name, value}) => {
    this.setState({
      [name]: value
    })
  }

  toggleFilterDirection = () => {
    this.setState({
      filterDirection: (this.state.filterDirection === DESC ? ASC : DESC)
    })
  }

  render() {
    return (
      <Grid verticalAlign='middle'>
        <Grid.Row columns={2}>
          <Grid.Column>
            <SearchBooks
              search={this.state.search}
              handleChange={this.handleChange}
            />
          </Grid.Column>
          <Grid.Column textAlign='right'>
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