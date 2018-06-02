import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  deleteMovie,
  editMovie,
  updateMovie,
  hideMovie,
  flagMovie,
  removeImage
} from '../../actions/movie';
import { toastr } from 'react-redux-toastr';
import moment from 'moment';

import Movie from '../../components/movies/Movie';
import MovieEdit from '../../components/movies/MovieEdit';

class MovieCard extends Component {
  state = {
    ...this.props.movie,
    editDate: moment(this.props.movie.date),
    focus: false
  };

  handleChange = (e, { name, value }) => {
    if (name === 'rating' || value.length < 256) {
      this.setState({
        [name]: value
      });
    }
  };

  handleSettings = (e, val) => {
    switch (val.value) {
      case 'Edit':
        this.edit();
        return;
      case 'Hide':
        this.hide();
        return;
      case 'Delete':
        this.delete();
        return;
      case 'Flag':
        this.flag();
        return;
      case 'Incorrect Image':
        this.removeImage();
        return;
      default:
        return;
    }
  };

  delete = () => {
    deleteMovie(this.state.id)
      .then(result => {
        this.props.dispatch(result);
        toastr.error('Deleted.', `Removed ${this.state.title} from your movies list.`);
      })
      .catch(err => {
        console.log(err);
      });
  };

  hide = () => {
    this.props.dispatch(hideMovie(this.state.id));
  };

  edit = () => {
    this.setState({
      ...this.props.movie
    });
    this.props.dispatch(editMovie(this.state.id));
  };

  removeImage = () => {
    this.props.dispatch(removeImage(this.state));
  };

  saveEdit = () => {
    if (!this.validateForm({ ...this.state })) {
      return;
    }

    const token = this.props.state.user.token;
    const editObj = {
      ...this.state,
      token
    };
    editObj.date = this.state.editDate;

    updateMovie(editObj)
      .then(result => {
        this.props.dispatch(result);
        toastr.info('Update.', `Updated ${this.state.title}.`);
      })
      .catch(err => {
        console.log(err);
      });
  };

  validateForm = movie => {
    if (!movie.title || !movie.date) {
      toastr.error('Invalid Movie', 'Please fill out all required fields.');
      return false;
    }
    return true;
  };

  flag = () => {
    flagMovie(this.state.id)
      .then(result => {
        this.props.dispatch(result);
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleDateChange = value => {
    this.setState({
      editDate: value,
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
    const { movie } = this.props;

    if (!movie.edit) {
      return (
        <Movie movie={movie} user={this.props.state.user} handleSettings={this.handleSettings} />
      );
    } else {
      return (
        <MovieEdit
          movie={this.state}
          saveEdit={this.saveEdit}
          cancelEdit={this.edit}
          handleChange={this.handleChange}
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

export default connect(mapStateToProps)(MovieCard);
