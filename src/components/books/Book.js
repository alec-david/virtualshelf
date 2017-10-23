import React, { Component } from 'react';

class Book extends Component {
  render() {
    const { title, author, date } = this.props.book;
    console.log(this.props.book);
    return (
      <li>
        {title} - {author} - {date}
      </li>
    );
  }
}

export default Book;
