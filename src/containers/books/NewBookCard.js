import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Image } from 'semantic-ui-react';
import { addBook } from '../../actions/index';
import { toastr } from 'react-redux-toastr';
import plusImg from '../../imgs/plus.svg';

import NewBook from '../../components/books/NewBook';

const imageStyle = {
  cursor: 'pointer'
}

const defaultState = {
  addBook: false,
  title: '',
  author: '',
  description: '',
  dateRead: '',
  rating: 3,
}

class NewBookCard extends Component {

  state = defaultState;

  addNewBook = () => {
    this.setState({
      addBook: true
    })
  }

  cancel = () => {
    this.setState({
      addBook: false
    })
  }

  handleSubmit = () => {
    if (!this.validateForm({ ...this.state })) {
      return;
    }
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

  validateForm = (book) => {
    if (!book.author || !book.title || !book.dateRead) {
      toastr.error('Invalid Book', 'Please fill out all required fields.');
      return false;
    }
    return true;
  }

  handleChange = (e, { name, value }) => {
    if (!value.length || value.length <= 255) {
      this.setState({
        [name]: value
      });
    }
  }

  render() {
    if (!this.state.addBook) {
      return (
        <Card>
          <Image
            src={plusImg}
            onClick={this.addNewBook.bind(this)}
            style={imageStyle}
          />
          <Card.Content>
            <Card.Header>
              Add a new book.
            </Card.Header>
          </Card.Content>
        </Card>
      )
    } else {
      return (
        <NewBook
          book={this.state}
          cancel={this.cancel}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      )
    }
  }
}

const mapStateToProps = state => {
  return { state };
};

export default connect(mapStateToProps)(NewBookCard);