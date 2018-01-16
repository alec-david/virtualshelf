import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addBook } from '../../actions/index';
import { reduxForm } from 'redux-form';

import AddBookForm from '../../components/books/AddBookForm';

const validate = values => {
  const errors = {}
  if (!values.title) {
    errors.title = 'Required';
  }
  if (!values.author) {
    errors.author = 'Required';
  }
  if (!values.date) {
    errors.date = 'Required';
  }
  if (!values.rating) {
    errors.rating = 'Required';
  }
  return errors;
}

const renderInput = ({
  input,
  label,
  type,
  meta: { touched, error }
}) => (
    <div>
      <label>{label}</label>
      <div>
        <input {...input} placeholder={label} type={type} />
        {touched && (error && <div style={{ color: 'red' }}>{error}</div>)}
      </div>
    </div >
  )

const renderSelect = ({
  input,
  label,
  type,
  meta: { touched, error }
  }) => (
    <div>
      <label>{label}</label>
      <div>
        <select {...input} placeholder={label} type={type} >
          <option />
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
          <option value='6'>6</option>
          <option value='7'>7</option>
          <option value='8'>8</option>
          <option value='9'>9</option>
          <option value='10'>10</option>
        </select>
        {touched && (error && <div style={{ color: 'red' }}>{error}</div>)}
      </div>
    </div >
  )

class AddBook extends Component {
  submitNewBook = book => {
    let asyncAdd = addBook(book);
    asyncAdd.then(bookJSON => {
      this.props.dispatch(bookJSON);
      this.props.reset();
    })
  };

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <AddBookForm
        handleSubmit={handleSubmit}
        submitting={submitting}
        addNewBook={this.submitNewBook}
        renderInput={renderInput}
        renderSelect={renderSelect}
      />
    );
  }
}

AddBook = connect()(AddBook);

export default reduxForm({
  form: 'addBookForm',
  validate
})(AddBook);
