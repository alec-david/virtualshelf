import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMovies, getUserMovies, hydrateMovies } from '../../actions/movie';
import { setHydratedMoviesFlag } from '../../actions/user';

import MovieList from '../../components/movies/MovieList';

class VisibleMovieList extends Component {
  state = {
    width: window.innerWidth
  };

  componentWillMount() {
    const { movies, user } = this.props.state;
    //If movies haven't been hydrated yet
    if (!user.loggingIn && !user.hydratedMovies) {
      this.checkUserLoggedIn(movies, user);
    }

    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  checkUserLoggedIn(movies, user) {
    if (!user.email) {
      this.fetchMostRecentMovies(movies);
    } else {
      this.fetchUserMovies(movies, user);
    }
  }

  fetchMostRecentMovies(movies) {
    getMovies()
      .then(movies => {
        this.props.dispatch(hydrateMovies(movies.body));
      })
      .then(() => {
        this.props.dispatch(setHydratedMoviesFlag());
      });
  }

  fetchUserMovies(movies, user) {
    getUserMovies(user.token)
      .then(movies => {
        if (!JSON.parse(movies.body).length) {
          //Show this message on screen at some point
          console.log('No movies entered yet!');
          return;
        }
        this.props.dispatch(hydrateMovies(movies.body));
      })
      .then(() => {
        this.props.dispatch(setHydratedMoviesFlag());
      });
  }

  render() {
    return <MovieList movies={this.props.state.movies.list} user={this.props.state.user} />;
  }
}

const mapStateToProps = state => {
  return { state };
};

export default connect(mapStateToProps)(VisibleMovieList);
