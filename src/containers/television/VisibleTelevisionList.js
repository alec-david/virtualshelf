import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getTelevision,
  getUserTelevision,
  hydrateTelevision
} from '../../actions/television';

import TelevisionList from '../../components/television/TelevisionList';

class VisibleTelevisionList extends Component {

  state = {
    width: window.innerWidth
  }

  componentWillMount() {
    const { television, user } = this.props.state;
    //If television haven't been hydrated yet
    if (!television.size && !user.loggingIn) {
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
      this.fetchMostRecentTelevision(television);
    } else {
      this.fetchUserTelevision(television, user);
    }
  }

  fetchMostRecentTelevision(television) {
    getTelevision().then(television => {
      this.props.dispatch(hydrateTelevision(television.body));
    });
  }

  fetchUserTelevision(television, user) {
    getUserTelevision(user.token).then(television => {
      if (!JSON.parse(television.body).length) {
        //Show this message on screen at some point
        console.log('No television entered yet!');
        return;
      }
      this.props.dispatch(hydrateTelevision(television.body));
    });
  }

  render() {
    const { width } = this.state;

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
    return (
      <TelevisionList
        television={this.props.state.television}
        colNum={colNum}
        user={this.props.state.user}
      />
    );
  }
}

const mapStateToProps = state => {
  return { state };
};

export default connect(mapStateToProps)(VisibleTelevisionList);
