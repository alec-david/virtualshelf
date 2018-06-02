import React from 'react';
import { Card } from 'semantic-ui-react';

import BookCard from '../../containers/books/BookCard';
import MovieCard from '../../containers/movies/MovieCard';
import TelevisionCard from '../../containers/television/TelevisionCard';

const ItemList = props => {
  const { items, loadedItems } = props;
  let cardId = 0;

  const srcText = items.size ? 'All images sourced from https://www.wikipedia.org/' : '';

  return (
    <div>
      <Card.Group centered>
        {items.slice(0, loadedItems).map(item => {
          if (item.author !== undefined) {
            return <BookCard key={cardId++} book={item} />;
          } else if (item.director !== undefined) {
            return <MovieCard key={cardId++} movie={item} />;
          } else {
            return <TelevisionCard key={cardId++} television={item} />;
          }
        })}
      </Card.Group>
      <br />
      <span className="srcText">{srcText}</span>
    </div>
  );
};

export default ItemList;
