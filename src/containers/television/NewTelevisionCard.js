import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTelevision } from '../../actions/television';
import { toastr } from 'react-redux-toastr';
import moment from 'moment';

import NewTelevision from '../../components/television/NewTelevision';
import AddNewTelevision from '../../components/television/AddNewTelevision';

const defaultState = {
  addTelevision: false,
  title: '',
  season: '',
  episode: '',
  description: '',
  date: moment(),
  rating: 3,
  focus: false
};

class NewTelevisionCard extends Component {
  state = defaultState;

  addNewTelevision = () => {
    this.setState({
      addTelevision: true
    });
  };

  cancel = () => {
    this.setState({
      addTelevision: false
    });
  };

  handleSubmit = () => {
    if (!this.validateForm({ ...this.state })) {
      return;
    }
    const televisionObj = {
      ...this.state,
      email: this.props.state.user.email
    };

    addTelevision(televisionObj).then(result => {
      this.props.dispatch(result);
      toastr.success('Success!', `Added ${this.state.title} to your watched television.`);
      this.setState({
        ...defaultState
      });
    });
  };

  validateForm = television => {
    if (!television.title || !television.date) {
      toastr.error('Invalid Television', 'Please fill out all required fields.');
      return false;
    }
    return true;
  };

  handleChange = (e, { name, value }) => {
    if (!value.length || value.length <= 255) {
      this.setState({
        [name]: value
      });
    }
  };

  handleDateChange = value => {
    this.setState({
      date: value,
      focus: false
    });
  };

  toggleFocus = focused => {
    this.setState({
      focus: focused
    });
  };

  disableFutureDays = day => moment().diff(day) < 0;

  render() {
    if (!this.state.addTelevision) {
      return <AddNewTelevision addNewTelevision={this.addNewTelevision} />;
    } else {
      return (
        <NewTelevision
          television={this.state}
          cancel={this.cancel}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleDateChange={this.handleDateChange}
          toggleFocus={this.toggleFocus}
          disableFutureDays={this.disableFutureDays}
        />
      );
    }
  }
}

const mapStateToProps = state => {
  return { state };
};

export default connect(mapStateToProps)(NewTelevisionCard);
