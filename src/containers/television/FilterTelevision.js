import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { filterTelevision, searchTelevision } from '../../actions/television';
import { filterItem, searchItem, defaultSearchFilter } from '../../actions/item';

import FilterDropdown from '../../components/util/FilterDropdown';
import Search from '../../components/util/Search';

const options = [
  { key: 'date', value: 'date', text: 'Date Watched' },
  { key: 'rating', value: 'rating', text: 'Rating' },
  { key: 'title', value: 'title', text: 'Title' }
];
const DESC = 'DESC';
const ASC = 'ASC';

class FilterTelevision extends Component {
  handleFilter = (e, val) => {
    const filterObj = {
      option: val.value,
      optionText: val.text,
      filterDirection: this.props.state.television.filterDirection
    };
    this.dispatchFilterAction(filterObj);
  };

  handleSearch = (e, { name, value }) => {
    this.dispatchSearchAction(value);
  };

  toggleFilterDirection = () => {
    const direction = this.props.state.television.filterDirection;
    const filterObj = {
      ...this.props.state.television,
      filterDirection: direction === DESC ? ASC : DESC
    };
    this.dispatchFilterAction(filterObj);
  };

  componentDidMount = () => {
    const { items, user } = this.props.state;

    if (
      user.hydratedTelevision &&
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
    this.props.dispatch(filterTelevision(filterObj));
    this.props.dispatch(filterItem(filterObj));
  };

  dispatchSearchAction = search => {
    this.props.dispatch(searchTelevision({ search }));
    this.props.dispatch(searchItem({ search }));
  };

  televisionExist = () => {
    const { user, television } = this.props.state;
    return user.hydratedTelevision && television.televisionCount;
  };

  render() {
    const { television } = this.props.state;
    const filterDirection = television.filterDirection === 'DESC' ? 'chevron down' : 'chevron up';
    if (this.televisionExist()) {
      return (
        <Grid verticalAlign="middle">
          <Grid.Row columns={1}>
            <Grid.Column>
              <Search
                search={television.search}
                handleSearch={this.handleSearch}
                placeholder="Search television..."
              />
              <br />
              <br />
              <FilterDropdown
                options={options}
                handleFilter={this.handleFilter}
                filter={television}
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

export default connect(mapStateToProps)(FilterTelevision);
