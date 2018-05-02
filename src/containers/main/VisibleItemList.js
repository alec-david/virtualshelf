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

  combineItems = () => {
    const { books, movies, television, user, items } = this.props.state;

    if (user.hydratedBooks && user.hydratedMovies && user.hydratedTelevision) {
      let sortedList = new List();
      let ptrArr = [0, 0, 0];
      while (ptrArr[0] < books.size ||
        ptrArr[1] < movies.size ||
        ptrArr[2] < television.size) {
        const objArr = [books.get(ptrArr[0]), movies.get(ptrArr[1]), television.get(ptrArr[2])];
        let directionFlag = items.direction === 'DESC';
        if (items.filter === 'title') {
          directionFlag = !directionFlag;
        }
        const index = this.minMaxObject(objArr, items.filter, directionFlag);
        sortedList = sortedList.push(objArr[index]);
        ptrArr[index]++;
      }

      return sortedList;
    }
    return [];
  }

  //maxFlag = false => return min object
  //maxFlag = true => return max object
  minMaxObject = (arr, prop, maxFlag) => {
    let index = -1;
    let val = '';
    for (let i = 0; i < arr.length; i++) {
      if (i === arr.length - 1) {
        return i;
      }
      if (arr[i]) {
        index = i;
        val = arr[i][prop];
        break;
      }
    }

    for (let i = index + 1; i < arr.length; i++) {
      if (!maxFlag) {
        if (arr[i] && arr[i][prop] < val) {
          index = i;
          val = arr[i][prop];
        }
      } else {
        if (arr[i] && arr[i][prop] > val) {
          index = i;
          val = arr[i][prop];
        }
      }
    }
    return index;
  }

  getNumberOfColumns = () => {
    const { width } = this.state;

    if (width > 1600) {
      return 7;
    } else if (width > 1400 && width <= 1600) {
      return 6;
    } else if (width > 1200 && width <= 1400) {
      return 5;
    } else if (width > 1000 && width <= 1200) {
      return 4;
    } else if (width > 800 && width <= 1000) {
      return 3;
    } else if (width > 600 && width <= 800) {
      return 2;
    } else { //Mobile width
      return 1;
    }
  }

  render() {
    return (
      <ItemList
        items={this.combineItems()}
        colNum={this.getNumberOfColumns()}
        user={this.props.state.user}
      />
    );
  }
}

const mapStateToProps = state => {
  return { state };
};

export default connect(mapStateToProps)(VisibleItemList);
