import React from 'react';
import { Field } from 'redux-form';

const AddBookForm = (props) => {
  const { handleSubmit, addNewBook, renderInput, renderSelect, submitting } = props;
  return (
    <div>
      <form onSubmit={handleSubmit(addNewBook)}>
        <div>
          <Field
            name="title"
            type="text"
            label="Title"
            component={renderInput}
          />
        </div>
        <div>
          <Field
            name="author"
            type="text"
            label="Author"
            component={renderInput}
          />
        </div>
        <div>
          <Field
            name="date"
            type="date"
            label="Date Read"
            component={renderInput}
          />
        </div>
        <div>
          <Field name="rating" type="select" label="Rating" component={renderSelect} />
        </div>
        <br />
        <button type="submit" disabled={submitting}>Add Book</button>
      </form>
    </div>
  );
};

export default AddBookForm;
