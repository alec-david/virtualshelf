import React from 'react';
import { Card } from 'semantic-ui-react';

import BookCard from '../../containers/books/BookCard';
import MovieCard from '../../containers/movies/MovieCard';
import TelevisionCard from '../../containers/television/TelevisionCard';

const ItemList = props => {
  const { items } = props;
  let cardId = 0;

  return (
    <div>
      <div style={{ fontSize: 10 + 'px' }}>All images sourced from https://www.wikipedia.org/</div>
      <Card.Group itemsPerRow={props.colNum}>
        {items.map(item => {
          if (item.author !== undefined) {
            return <BookCard key={cardId++} book={item} />;
          } else if (item.director !== undefined) {
            return <MovieCard key={cardId++} movie={item} />;
          } else {
            return <TelevisionCard key={cardId++} television={item} />;
          }
        })}
      </Card.Group>
    </div>
  );
};

export default ItemList;
