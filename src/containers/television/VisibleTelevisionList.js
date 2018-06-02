import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getTelevision,
  getUserTelevision,
  hydrateTelevision,
  loadMoreTelevision
} from '../../actions/television';
import { setHydratedTelevisionFlag } from '../../actions/user';

import TelevisionList from '../../components/television/TelevisionList';

const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

class VisibleTelevisionList extends Component {
  componentWillMount() {
    const { television, user } = this.props.state;
    //If television haven't been hydrated yet
    if (!user.loggingIn && !user.hydratedTelevision) {
      this.checkUserLoggedIn(television, user);
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', debounce(this.handleScroll, 250, true));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', debounce(this.handleScroll, 250, true));
  }

  handleScroll = e => {
    const { television } = this.props.state;
    const element = e.target.scrollingElement;

    if (
      element.scrollHeight - element.scrollTop < element.clientHeight + 150 &&
      television.list.size > television.loadedTelevision
    ) {
      this.props.dispatch(loadMoreTelevision());
    }
  };

  checkUserLoggedIn(television, user) {
    if (!user.email) {
      this.fetchAllTelevision(television);
    } else {
      this.fetchUserTelevision(television, user);
    }
  }

  fetchAllTelevision(television) {
    getTelevision()
      .then(television => {
        this.props.dispatch(hydrateTelevision(television.body));
      })
      .then(() => {
        this.props.dispatch(setHydratedTelevisionFlag());
      });
  }

  fetchUserTelevision(television, user) {
    getUserTelevision(user.token)
      .then(television => {
        if (!JSON.parse(television.body).length) {
          //Show this message on screen at some point
          console.log('No television entered yet!');
          return;
        }
        this.props.dispatch(hydrateTelevision(television.body));
      })
      .then(() => {
        this.props.dispatch(setHydratedTelevisionFlag());
      });
  }

  render() {
    const { user, television } = this.props.state;
    if (user.hydratedTelevision) {
      return <TelevisionList television={television} user={user} />;
    }
    return <div />;
  }
}

const mapStateToProps = state => {
  return { state };
};

export default connect(mapStateToProps)(VisibleTelevisionList);
