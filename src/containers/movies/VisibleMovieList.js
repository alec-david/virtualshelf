import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getMovies,
  getUserMovies,
  hydrateMovies
} from '../../actions/movie';
import { setHydratedMoviesFlag } from '../../actions/user';

import MovieList from '../../components/movies/MovieList';

class VisibleMovieList extends Component {

  state = {
    width: window.innerWidth
  }

  componentWillMount() {
    const { movies, user } = this.props.state;
    //If movies haven't been hydrated yet
    if (!movies.size && !user.hydratedMovies) {
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
    getMovies().then(movies => {
      this.props.dispatch(hydrateMovies(movies.body));
    }).then(() => {
      this.props.dispatch(setHydratedMoviesFlag());
    });
  }

  fetchUserMovies(movies, user) {
    getUserMovies(user.token).then(movies => {
      if (!JSON.parse(movies.body).length) {
        //Show this message on screen at some point
        console.log('No movies entered yet!');
        return;
      }
      this.props.dispatch(hydrateMovies(movies.body));
    }).then(() => {
      this.props.dispatch(setHydratedMoviesFlag());
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
    } else { //Mobile width
      return 1;
    }
  }

  render() {
    return (
      <MovieList
        movies={this.props.state.movies}
        colNum={this.getNumberOfColumns()}
        user={this.props.state.user}
      />
    );
  }
}

const mapStateToProps = state => {
  return { state };
};

export default connect(mapStateToProps)(VisibleMovieList);
