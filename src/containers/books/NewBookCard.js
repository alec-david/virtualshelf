import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addBook } from '../../actions/book';
import { toastr } from 'react-redux-toastr';
import moment from 'moment';

import NewBook from '../../components/books/NewBook';
import AddNewBook from '../../components/books/AddNewBook';

const defaultState = {
  addBook: false,
  title: '',
  author: '',
  description: '',
  date: moment(),
  rating: 3,
  focus: false
};

class NewBookCard extends Component {
  state = defaultState;

  addNewBook = () => {
    this.setState({
      addBook: true
    });
  };

  cancel = () => {
    this.setState({
      addBook: false
    });
  };

  handleSubmit = () => {
    if (!this.validateForm({ ...this.state })) {
      return;
    }
    const bookObj = {
      ...this.state,
      email: this.props.state.user.email
    };

    addBook(bookObj).then(result => {
      this.props.dispatch(result);
      toastr.success('Success!', `Added ${this.state.title} to your read books`);
      this.setState({
        ...defaultState
      });
    });
  };

  validateForm = book => {
    if (!book.author || !book.title || !book.date) {
      toastr.error('Invalid Book', 'Please fill out all required fields.');
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
    if (!this.state.addBook) {
      return <AddNewBook addNewBook={this.addNewBook} />;
    }
    return (
      <NewBook
        book={this.state}
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

const mapStateToProps = state => {
  return { state };
};

export default connect(mapStateToProps)(NewBookCard);
