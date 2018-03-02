import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addBook } from '../../actions/index';
import { toastr } from 'react-redux-toastr';

import AddBookForm from '../../components/books/AddBookForm';

const defaultState = {
  title: '',
  author: '',
  dateRead: '',
  rating: 3,
  description: ''
}

class AddBook extends Component {

  state = defaultState;

  submitNewBook = book => {
    let asyncAdd = addBook(book);
    asyncAdd.then(bookJSON => {
      this.props.dispatch(bookJSON);
      this.props.reset();
    })
  };

  handleSubmit = () => {
    const bookObj = {
      ...this.state,
      email: this.props.state.user.email
    }
    addBook(bookObj).then(result => {
      this.props.dispatch(result);
      toastr.success('Success!', `Added ${this.state.title} to your read books`);
      this.setState({
        ...defaultState
      });
    })
  }

  handleChange = (e, { name, value }) => {
    if (!value.length || value.length <= 255) {
      this.setState({
        [name]: value
      });
    }
  }

  render() {
    return (
      <AddBookForm
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        handleRateChange={this.handleRateChange}
        book={this.state}
      />
    );
  }
}

const mapStateToProps = state => {
  return { state };
};

export default connect(mapStateToProps)(AddBook);
