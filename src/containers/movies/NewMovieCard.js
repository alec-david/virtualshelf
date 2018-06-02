import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addMovie } from '../../actions/movie';
import { toastr } from 'react-redux-toastr';
import moment from 'moment';

import NewMovie from '../../components/movies/NewMovie';
import AddNewMovie from '../../components/movies/AddNewMovie';

const defaultState = {
  addMovie: false,
  title: '',
  director: '',
  description: '',
  date: moment(),
  rating: 3,
  focus: false
};

class NewMovieCard extends Component {
  state = defaultState;

  addNewMovie = () => {
    this.setState({
      addMovie: true
    });
  };

  cancel = () => {
    this.setState({
      addMovie: false
    });
  };

  handleSubmit = () => {
    if (!this.validateForm({ ...this.state })) {
      return;
    }
    const movieObj = {
      ...this.state,
      email: this.props.state.user.email
    };

    addMovie(movieObj).then(result => {
      this.props.dispatch(result);
      toastr.success('Success!', `Added ${this.state.title} to your watched movies.`);
      this.setState({
        ...defaultState
      });
    });
  };

  validateForm = movie => {
    if (!movie.title || !movie.date) {
      toastr.error('Invalid Movie', 'Please fill out all required fields.');
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
    if (!this.state.addMovie) {
      return <AddNewMovie addNewMovie={this.addNewMovie} />;
    } else {
      return (
        <NewMovie
          movie={this.state}
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

export default connect(mapStateToProps)(NewMovieCard);
