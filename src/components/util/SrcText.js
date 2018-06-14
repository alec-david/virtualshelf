import React from 'react';

const SrcText = props => {
  const { itemCount } = props;

  return itemCount ? (
    <div className="srcText">
      <a href="https://www.wikipedia.org/">Images from wikipedia.org </a> --{' '}
      <a href="https://icons8.com">Icon pack by Icons8</a>
    </div>
  ) : (
    ''
  );
};

export default SrcText;
