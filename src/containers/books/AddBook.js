import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addBook } from '../../actions/index';
import { reduxForm } from 'redux-form';

import AddBookForm from '../../components/books/AddBookForm';

class AddBook extends Component {
  submitNewBook = book => {
    this.props.dispatch(addBook(book));
    this.props.reset();
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <AddBookForm
        handleSubmit={handleSubmit}
        addNewBook={this.submitNewBook}
      />
    );
  }
}

AddBook = connect()(AddBook);

export default reduxForm({
  form: 'addBookForm'
})(AddBook);
