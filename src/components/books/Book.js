import React, { Component } from 'react';

var divStyle = {
  color: 'red',
};

class Book extends Component {
  render() {
    const { title, author, date, rating, id } = this.props.book;
    const formattedDate = new Date(date).toLocaleDateString();
    return (
      <li>
        {title} - {author} - {formattedDate} - {rating}/10{'  '}<span onClick={this.props.delete.bind(this, id)} style={divStyle}><b>X</b></span>
      </li >
    );
  }
}

export default Book;
