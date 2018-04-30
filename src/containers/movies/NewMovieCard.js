import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Image } from 'semantic-ui-react';
import { addMovie } from '../../actions/movie';
import { toastr } from 'react-redux-toastr';
import plusImg from '../../imgs/plus.svg';

import NewMovie from '../../components/movies/NewMovie';

const imageStyle = {
  cursor: 'pointer'
}

const defaultState = {
  addMovie: false,
  title: '',
  director: '',
  description: '',
  date: '',
  rating: 3,
}

class NewMovieCard extends Component {

  state = defaultState;

  addNewMovie = () => {
    this.setState({
      addMovie: true
    })
  }

  cancel = () => {
    this.setState({
      addMovie: false
    })
  }

  handleSubmit = () => {
    if (!this.validateForm({ ...this.state })) {
      return;
    }
    const movieObj = {
      ...this.state,
      email: this.props.state.user.email
    }

    addMovie(movieObj).then(result => {
      this.props.dispatch(result);
      toastr.success('Success!', `Added ${this.state.title} to your watched movies.`);
      this.setState({
        ...defaultState
      });
    })
  }

  validateForm = (movie) => {
    console.log(movie);
    if (!movie.title || !movie.date) {
      toastr.error('Invalid Movie', 'Please fill out all required fields.');
      return false;
    }
    return true;
  }

  handleChange = (e, { name, value }) => {
    if (!value.length || value.length <= 255) {
      this.setState({
        [name]: value
      });
    }
  }

  render() {
    if (!this.state.addMovie) {
      return (
        <Card>
          <Image
            src={plusImg}
            onClick={this.addNewMovie}
            style={imageStyle}
          />
          <Card.Content>
            <Card.Header>
              Add a new movie.
            </Card.Header>
          </Card.Content>
        </Card>
      )
    } else {
      return (
        <NewMovie
          movie={this.state}
          cancel={this.cancel}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      )
    }
  }
}

const mapStateToProps = state => {
  return { state };
};

export default connect(mapStateToProps)(NewMovieCard);