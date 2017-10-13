import React from 'react';
import { connect } from 'react-redux';
import { addBook } from '../../actions/index';

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
};

AddBook = connect()(AddBook);

export default AddBook;
