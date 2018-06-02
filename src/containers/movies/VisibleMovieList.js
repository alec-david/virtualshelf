import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMovies, getUserMovies, hydrateMovies, loadMoreMovies } from '../../actions/movie';
import { setHydratedMoviesFlag } from '../../actions/user';

import MovieList from '../../components/movies/MovieList';

const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

class VisibleMovieList extends Component {
  componentWillMount() {
    const { movies, user } = this.props.state;
    //If movies haven't been hydrated yet
    if (!user.loggingIn && !user.hydratedMovies) {
      this.checkUserLoggedIn(movies, user);
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', debounce(this.handleScroll, 250, true));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', debounce(this.handleScroll, 250, true));
  }

  handleScroll = e => {
    const { movies } = this.props.state;
    const element = e.target.scrollingElement;

    if (
      element.scrollHeight - element.scrollTop < element.clientHeight + 150 &&
      movies.list.size > movies.loadedMovies
    ) {
      this.props.dispatch(loadMoreMovies());
    }
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
    const { user, movies } = this.props.state;
    if (user.hydratedMovies) {
      return <MovieList movies={movies} user={user} />;
    }
    return <div />;
  }
}

const mapStateToProps = state => {
  return { state };
};

export default connect(mapStateToProps)(VisibleMovieList);
