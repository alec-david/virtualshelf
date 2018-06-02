import React, { Component } from 'react';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { getBooks, getUserBooks, hydrateBooks } from '../../actions/book';
import { getMovies, getUserMovies, hydrateMovies } from '../../actions/movie';
import { getTelevision, getUserTelevision, hydrateTelevision } from '../../actions/television';
import { setHydratedAllFlag } from '../../actions/user';
import { loadMoreItems } from '../../actions/item';

import ItemList from '../../components/main/ItemList';
import NoItemMessage from '../../components/main/NoItemMessage';

const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

class VisibleItemList extends Component {
  componentWillMount() {
    const { user } = this.props.state;
    if (
      !user.loggingIn &&
      (!user.hydratedBooks || !user.hydratedMovies || !user.hydratedTelevision)
    ) {
      this.checkUserLoggedIn(user);
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', debounce(this.handleScroll, 250, true));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', debounce(this.handleScroll, 250, true));
  }

  handleScroll = e => {
    const { books, movies, television, items } = this.props.state;
    const element = e.target.scrollingElement;

    const totalItems = books.list.size + movies.list.size + television.list.size;

    if (
      element.scrollHeight - element.scrollTop < element.clientHeight + 150 &&
      totalItems > items.loadedItems
    ) {
      this.props.dispatch(loadMoreItems());
    }
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

    Promise.all(promiseArr)
      .then(result => {
        for (let i = 0; i < result.length; i++) {
          this.props.dispatch(dispatchArr[i](result[i].body));
        }
      })
      .then(() => {
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

    Promise.all(promiseArr)
      .then(result => {
        for (let i = 0; i < result.length; i++) {
          this.props.dispatch(dispatchArr[i](result[i].body));
        }
      })
      .then(() => {
        this.props.dispatch(setHydratedAllFlag());
      });
  }

  combineItems = () => {
    const { books, movies, television, user, items } = this.props.state;

    if (user.hydratedBooks && user.hydratedMovies && user.hydratedTelevision) {
      let sortedList = new List();
      let ptrArr = [0, 0, 0];
      while (
        ptrArr[0] < books.list.size ||
        ptrArr[1] < movies.list.size ||
        ptrArr[2] < television.list.size
      ) {
        const objArr = [
          books.list.get(ptrArr[0]),
          movies.list.get(ptrArr[1]),
          television.list.get(ptrArr[2])
        ];
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
  };

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
  };

  render() {
    const allItems = this.combineItems();
    const { user, items } = this.props.state;

    if (user.hydratedBooks && user.hydratedMovies && user.hydratedTelevision) {
      if (allItems === undefined || allItems.size === 0) {
        return <NoItemMessage />;
      }
      return <ItemList items={allItems} loadedItems={items.loadedItems} />;
    }
    return <div />;
  }
}

const mapStateToProps = state => {
  return { state };
};

export default connect(mapStateToProps)(VisibleItemList);
