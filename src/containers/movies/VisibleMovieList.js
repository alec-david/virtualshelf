import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getMovies,
  getUserMovies,
  hydrateMovies
} from '../../actions/movie';

import MovieList from '../../components/movies/MovieList';

class VisibleMovieList extends Component {

  state = {
    width: window.innerWidth
  }

  componentWillMount() {
    const { movies, user } = this.props.state;
    //If movies haven't been hydrated yet
    if (!movies.size && !user.loggingIn) {
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
      <MovieList
        movies={this.props.state.movies}
        colNum={colNum}
        user={this.props.state.user}
      />
    );
  }
}

const mapStateToProps = state => {
  return { state };
};

export default connect(mapStateToProps)(VisibleMovieList);
