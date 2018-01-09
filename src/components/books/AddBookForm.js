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
        <div>
          <label>Rating</label>
          <div>
            <Field name="rating" component="select">
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
            </Field>
          </div>
        </div>
        <br />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBookForm;
