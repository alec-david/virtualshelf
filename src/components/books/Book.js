import React, { Component } from 'react';

var divStyle = {
  color: 'red',
};

class Book extends Component {
  render() {
    const { title, author, date_read, rating, id } = this.props.book;
    const formattedDate = new Date(date_read).toLocaleDateString();
    return (
      <li>
        {title} - {author} - {formattedDate} - {rating}/10{'  '}<span onClick={this.props.delete.bind(this, id)} style={divStyle}><b>X</b></span>
      </li >
    );
  }
}

export default Book;
