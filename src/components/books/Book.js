import React, { Component } from 'react';

class Book extends Component {
  render() {
    const { title, author, date, rating } = this.props.book;
    console.log(this.props.book);
    const formattedDate = new Date(date).toLocaleDateString();
    return (
      <li>
        {title} - {author} - {formattedDate} - {rating}/10
      </li>
    );
  }
}

export default Book;
