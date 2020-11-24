import React from 'react';

const Ticker = ({ ticker }) => {
  return (
    <div>
      {ticker.symbol} : {ticker.last_price}
    </div>
  );
};

export default Ticker;
