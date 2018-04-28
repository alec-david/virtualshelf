import React, { Component } from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import {
  getBooks,
  getUserBooks,
  hydrateBooks
} from '../../actions/book';
import {
  getMovies,
  getUserMovies,
  hydrateMovies
} from '../../actions/movie';
import {
  getTelevision,
  getUserTelevision,
  hydrateTelevision
} from '../../actions/television';
import { setHydratedAllFlag } from '../../actions/user';

import ItemList from '../../components/main/ItemList';

class VisibleItemList extends Component {

  state = {
    width: window.innerWidth,
    allItems: List()
  }

  componentWillMount() {
    const { user } = this.props.state;
    if (!user.loggingIn && 
      (!user.hydratedBooks || !user.hydratedMovies || !user.hydratedTelevision)
    ) {
      this.checkUserLoggedIn(user);
    }

    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  checkUserLoggedIn(user) {
    if (!user.email) {
      this.fetchAllItems(user);
    } else {
      this.fetchUserItems(user);
    }
  }

  fetchAllItems(user) {
    let promiseArr = [];
    let dispatchArr = [];
    if (!user.hydratedBooks) {
      promiseArr.push(getBooks());
      dispatchArr.push(hydrateBooks);
    }
    if (!user.hydratedMovies) {
      promiseArr.push(getMovies());
      dispatchArr.push(hydrateMovies);
    }
    if (!user.hydratedTelevision) {
      promiseArr.push(getTelevision());
      dispatchArr.push(hydrateTelevision);
    }

    Promise.all(promiseArr).then(result => {
      for (let i = 0; i < result.length; i++) {
        this.props.dispatch(dispatchArr[i](result[i].body));
      }
    }).then(() => {
      this.props.dispatch(setHydratedAllFlag());
    });
  }

  fetchUserItems(user) {
    let promiseArr = [];
    let dispatchArr = [];
    if (!user.hydratedBooks) {
      promiseArr.push(getUserBooks(user.token));
      dispatchArr.push(hydrateBooks);
    }
    if (!user.hydratedMovies) {
      promiseArr.push(getUserMovies(user.token));
      dispatchArr.push(hydrateMovies);
    }
    if (!user.hydratedTelevision) {
      promiseArr.push(getUserTelevision(user.token));
      dispatchArr.push(hydrateTelevision);
    }

    Promise.all(promiseArr).then(result => {
      for (let i = 0; i < result.length; i++) {
        this.props.dispatch(dispatchArr[i](result[i].body));
      }
    }).then(() => {
      this.props.dispatch(setHydratedAllFlag());
    });
  }

  calculateNumberofColumns = (width) => {
    let colNum;
    if (width > 1600) {
      colNum = 7;
    } else if (width > 1400 && width <= 1600) {
      colNum = 6;
    } else if (width > 1200 && width <= 1400) {
      colNum = 5;
    } else if (width > 1000 && width <= 1200) {
      colNum = 4;
    } else if (width > 800 && width <= 1000) {
      colNum = 3;
    } else if (width > 600 && width <= 800) {
      colNum = 2;
    } else { //Mobile width
      colNum = 1;
    }
    return colNum;
  }

  combineItems = () => {
    const { books, movies, television } = this.props.state;
    return books.concat(movies).concat(television);
  }

  render() {
    const { width } = this.state;
    const colNum = this.calculateNumberofColumns(width);

    return (
      <ItemList
        items={this.combineItems()}
        colNum={colNum}
        user={this.props.state.user}
      />
    );
  }
}

const mapStateToProps = state => {
  return { state };
};

export default connect(mapStateToProps)(VisibleItemList);
