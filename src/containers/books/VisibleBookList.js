import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { getBooks, hydrateBooks, deleteBook } from '../../actions/index';

import BookList from '../../components/books/BookList';

const mapStateToProps = state => {
  return { state };
};

class VisibleBookList extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
  }

  componentWillMount() {
    //If books haven't been hydrated yet
    if (!this.props.state.books.size) {
      getBooks().then(books => {
        this.props.dispatch(hydrateBooks(books));
      });
    }
  }

  delete(id, title) {
    deleteBook(id).then(result => {
      this.props.dispatch(result);
      toastr.info('Deleted.', `Removed ${title} from your books list.`)
    }).catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <BookList delete={this.delete} books={this.props.state.books} />
    );
  }
}

export default connect(mapStateToProps)(VisibleBookList);
