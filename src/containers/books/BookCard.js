import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteBook, editBook, updateBook, hideBook, flagBook } from '../../actions/book';
import { toastr } from 'react-redux-toastr';

import Book from '../../components/books/Book';
import BookEdit from '../../components/books/BookEdit';

class BookCard extends Component {
  state = {
    ...this.props.book
  };

  handleChange = (e, { name, value }) => {
    if (name === 'rating' || value.length < 256) {
      this.setState({
        [name]: value
      });
    }
  };

  handleSettings = (e, val) => {
    switch (val.value) {
      case 'Edit':
        this.edit();
        return;
      case 'Hide':
        this.hide();
        return;
      case 'Delete':
        this.delete();
        return;
      case 'Flag':
        this.flag();
        return;
      default:
        console.log('Uh oh');
        return;
    }
  };

  delete = () => {
    deleteBook(this.state.id)
      .then(result => {
        this.props.dispatch(result);
        toastr.error('Deleted.', `Removed ${this.state.title} from your books list.`);
      })
      .catch(err => {
        console.log(err);
      });
  };

  hide = () => {
    this.props.dispatch(hideBook(this.state.id));
  };

  edit = () => {
    this.setState({
      ...this.props.book
    });
    this.props.dispatch(editBook(this.state.id));
  };

  saveEdit = () => {
    if (!this.validateForm({ ...this.state })) {
      return;
    }

    const token = this.props.state.user.token;
    const editObj = {
      ...this.state,
      token
    };

    updateBook(editObj)
      .then(result => {
        this.props.dispatch(result);
        toastr.info('Update.', `Updated ${this.state.title}.`);
      })
      .catch(err => {
        console.log(err);
      });
  };

  validateForm = book => {
    if (!book.author || !book.title || !book.date) {
      toastr.error('Invalid Book', 'Please fill out all required fields.');
      return false;
    }
    return true;
  };

  flag = () => {
    flagBook(this.state.id)
      .then(result => {
        this.props.dispatch(result);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { book } = this.props;
    if (!book.edit) {
      return <Book book={book} user={this.props.state.user} handleSettings={this.handleSettings} />;
    } else {
      return (
        <BookEdit
          book={this.state}
          saveEdit={this.saveEdit}
          cancelEdit={this.edit}
          handleChange={this.handleChange}
        />
      );
    }
  }
}

const mapStateToProps = state => {
  return { state };
};

export default connect(mapStateToProps)(BookCard);
