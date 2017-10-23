import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addBook } from '../../actions/index';
import { Field, reduxForm } from 'redux-form';

class AddBook extends Component {
  testAsuh = book => {
    this.props.reset();
    this.props.dispatch(addBook(book));
  };

  render() {
    const { handleSubmit, reset } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.testAsuh)}>
          <div>
            <label>Title</label>
            <div>
              <Field
                name="title"
                component="input"
                type="text"
                placeholder="Title"
              />
            </div>
          </div>
          <div>
            <label>Author</label>
            <div>
              <Field
                name="author"
                component="input"
                type="text"
                placeholder="Author"
              />
            </div>
          </div>
          <div>
            <label>Date Read</label>
            <div>
              <Field
                name="date"
                component="input"
                type="date"
                placeholder="Date"
              />
            </div>
          </div>
          <button type="submit">Add Book</button>
        </form>
      </div>
    );
  }
}

AddBook = connect()(AddBook);

export default reduxForm({
  form: 'addBookForm'
})(AddBook);

//export default AddBook;

/*
let AddBook = ({ dispatch }) => {
  let input;
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!input.value.trim()) {
            return;
          }
          dispatch(addBook(input.value));
          input.value = '';
        }}>
        <input
          ref={node => {
            input = node;
          }}
        />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}
*/
