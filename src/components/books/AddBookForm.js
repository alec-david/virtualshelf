import React from 'react';
import { Field } from 'redux-form';

const AddBookForm = ({ handleSubmit, addNewBook }) => {
  return (
    <div>
      <form onSubmit={handleSubmit(addNewBook)}>
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
};

export default AddBookForm;
