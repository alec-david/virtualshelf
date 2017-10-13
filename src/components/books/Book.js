import React, { Component } from 'react';

class Book extends Component {
  render() {
    const { title, author } = this.props.book;
    console.log(this.props.book);
    return <li>{title}</li>;
  }
}

export default Book;
