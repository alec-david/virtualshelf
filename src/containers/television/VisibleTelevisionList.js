import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTelevision, getUserTelevision, hydrateTelevision } from '../../actions/television';
import { setHydratedTelevisionFlag } from '../../actions/user';

import TelevisionList from '../../components/television/TelevisionList';

class VisibleTelevisionList extends Component {
  state = {
    width: window.innerWidth
  };

  componentWillMount() {
    const { television, user } = this.props.state;
    //If television haven't been hydrated yet
    if (!user.loggingIn && !user.hydratedTelevision) {
      this.checkUserLoggedIn(television, user);
    }

    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
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
    } else {
      //Mobile width
      return 1;
    }
  };

  render() {
    return (
      <TelevisionList
        television={this.props.state.television.list}
        colNum={this.getNumberOfColumns()}
        user={this.props.state.user}
      />
    );
  }
}

const mapStateToProps = state => {
  return { state };
};

export default connect(mapStateToProps)(VisibleTelevisionList);
